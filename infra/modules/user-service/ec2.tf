resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "user-service-instance-profile"
  role = aws_iam_role.ecs_instance_role.name
}

resource "aws_launch_template" "user_service" {
  name                   = "user-service-ec2-launch-template"
  image_id               = var.ecs_ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.user_service_sg.id]

  user_data = base64encode(<<EOF
  #!/bin/bash
  cat << 'EOF' >> /etc/ecs/ecs.config
  ECS_CLUSTER=${var.ecs_cluster_name}
  EOF
  )

  monitoring {
    enabled = true
  }
  iam_instance_profile {
    name = aws_iam_instance_profile.ecs_instance_profile.name
  }
}

resource "aws_autoscaling_group" "user_service_asg" {
  desired_capacity      = 2
  max_size              = 4
  min_size              = 1
  vpc_zone_identifier   = var.subnet_ids
  target_group_arns     = [var.user_service_target_group_arn]
  protect_from_scale_in = true

  launch_template {
    id      = aws_launch_template.user_service.id
    version = aws_launch_template.user_service.latest_version
  }

  health_check_type         = "EC2"
  health_check_grace_period = 300

  instance_refresh {
    strategy = "Rolling"
  }

  tag {
    key                 = "Name"
    value               = "user-service-instance"
    propagate_at_launch = true # propagate this tag to all
  }

}

resource "aws_security_group" "user_service_sg" {
  name        = "user-service-security-group"
  description = "Allowing traffic to/from User Service"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5004
    to_port     = 5004
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr] # allow inbound within vpc, to port 5004
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
