resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "user-service-instance-profile"
  role = aws_iam_role.ecs_instance_role.name
}

resource "aws_launch_template" "user_service_launch_template" {
  name                   = "user-service-ec2-launch-template"
  image_id               = var.ecs_ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.user_service_sg.id]

  user_data = base64encode(<<EOF
  #!/bin/bash
  cat <<'EOF' >> /etc/ecs/ecs.config
  ECS_CLUSTER=${var.ecs_cluster_name}
  EOF
  )
}

resource "aws_security_group" "user_service_sg" {
  name        = "user-service-security-group"
  description = "Allowing traffic to/from User Service"

  ingress {
    from_port   = 80
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
    cidr_blocks = ["0.0.0.0/0"] # allow inbound from everywhere, to port 5004
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
