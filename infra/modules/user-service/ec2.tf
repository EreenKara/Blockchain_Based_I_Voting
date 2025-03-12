resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "user-service-instance-profile"
  role = aws_iam_role.ecs_instance_role.name
}

resource "aws_launch_template" "user_service" {
  depends_on = [var.postgre_db_instance]

  name                   = "user-service-lt"
  image_id               = var.ecs_ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.user_service_sg.id]

  user_data = base64encode(<<EOF
  #!/bin/bash
  cat <<'EOF' >> /etc/ecs/ecs.config
  ECS_CLUSTER=${var.ecs_cluster_name}
  EOF
  )

  monitoring {
    enabled = true
  }
  iam_instance_profile {
    name = aws_iam_instance_profile.ecs_instance_profile.name
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "ivote-user-service-instance"
    }
  }
}

resource "aws_autoscaling_group" "user_service_asg" {
  vpc_zone_identifier = [var.public_subnet_id]
  desired_capacity    = 1
  max_size            = 1 # only one instance
  min_size            = 1

  launch_template {
    id      = aws_launch_template.user_service.id
    version = aws_launch_template.user_service.latest_version
  }

  tag {
    key                 = "Name"
    value               = "ivote-user-service-asg"
    propagate_at_launch = false
  }
}

data "aws_instances" "user_service" {
  depends_on = [aws_autoscaling_group.user_service_asg]

  filter {
    name   = "tag:Name"
    values = ["ivote-user-service-instance"]
  }
}

resource "aws_security_group" "user_service_sg" {
  name        = "user-service-security-group"
  description = "Allowing traffic to/from User Service"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80 # http
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443 # https
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5004
    to_port     = 5004
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr] # allow vpc only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
