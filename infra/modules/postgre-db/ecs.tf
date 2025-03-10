resource "aws_security_group" "postgre_sg" {
  name   = "postgre-sec-group"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ivote-postgre-sg"
  }
}

resource "aws_ebs_volume" "postgre_ebs" {
  count             = 2
  availability_zone = var.azs[count.index] # for each AZ
  size              = 5
  type              = "gp2"
}

resource "aws_launch_template" "ecs_lt" {
  name          = "postgre-launch-template"
  image_id      = var.ecs_ami_id
  instance_type = var.instance_type

  network_interfaces {
    associate_public_ip_address = false
    security_groups             = [aws_security_group.postgre_sg.id]
  }

  block_device_mappings {
    device_name = "/dev/xvdf" # ebs volume mount path
    ebs {
      volume_size           = 10
      volume_type           = "gp3"
      delete_on_termination = true
    }
  }

  user_data = base64encode(<<EOF
  #!/bin/bash
  cat <<'EOF' >> /etc/ecs/ecs.config
  ECS_CLUSTER=${var.ecs_cluster_name}

  # Mount the EBS volume
  mkfs -t ext4 /dev/xvdf
  mkdir -p /mnt/ebs
  mount /dev/xvdf /mnt/ebs
  chown -R ec2-user:ec2-user /mnt/ebs
  echo "/dev/xvdf /mnt/ebs ext4 defaults,nofail 0 2" >> /etc/fstab
  EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "ivote-postgre-instance"
    }
  }

  tag_specifications {
    resource_type = "volume"
    tags = {
      Name = "ivote-postgre-volume"
    }
  }

}

resource "aws_autoscaling_group" "postgre_asg" {
  desired_capacity    = 2
  max_size            = 2
  min_size            = 1
  vpc_zone_identifier = var.subnet_ids

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = aws_launch_template.ecs_lt.latest_version
  }

  tag {
    key                 = "Name"
    value               = "ivote-postgre-asg"
    propagate_at_launch = false
  }
}

resource "aws_cloudwatch_log_group" "postgre_logs" {
  name              = "/ecs/i-vote/postgre"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "postgre" {
  family                   = "ivote-postgre"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = "512"
  memory                   = "768"

  task_role_arn      = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "postgres-container"
    image     = "postgres:15" # official postgresql image
    cpu       = 512
    memory    = 768
    essential = true

    environment = [
      { name = "POSTGRES_USER", value = var.db_username },
      { name = "POSTGRES_PASSWORD", value = var.db_password },
      { name = "POSTGRES_DB", value = var.db_name }
    ]

    portMappings = [
      {
        containerPort = 5432,
        hostPort      = 5432,
        protocol      = "tcp"
      }
    ]

    mountPoints = [
      {
        sourceVolume  = "ebs-storage"
        containerPath = "/var/lib/postgresql/data"
    }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "${aws_cloudwatch_log_group.postgre_logs.name}"
        "awslogs-region"        = "${var.aws_region}"
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])

  volume {
    name      = "ebs-storage"
    host_path = "/mnt/ebs"
  }
}

resource "aws_ecs_service" "postgre_service" {
  name                    = "postgres-service"
  cluster                 = var.ecs_cluster_id
  task_definition         = aws_ecs_task_definition.postgre.arn
  desired_count           = 2
  enable_ecs_managed_tags = false

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.postgre_cp.name
    weight            = 1
  }

  tags = {
    Name = "ivote-postgre-ecs-service"
  }
}

resource "aws_ecs_capacity_provider" "postgre_cp" {
  name = "postgre-cap-provider"
  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.postgre_asg.arn
    managed_scaling {
      status                    = "ENABLED"
      target_capacity           = 75
      minimum_scaling_step_size = 1
      maximum_scaling_step_size = 2
      instance_warmup_period    = 60
    }
    managed_termination_protection = "DISABLED"
  }

  tags = {
    Name = "ivote-postgre-cp"
  }
}
