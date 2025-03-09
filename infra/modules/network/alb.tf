resource "aws_lb" "ivote_alb" {
  name               = "ivote-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = aws_subnet.public[*].id # use both AZs

  tags = {
    Name = "ivote-alb"
  }
}

resource "aws_security_group" "alb_sg" {
  name        = "alb-security-group"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "alb-security-group"
  }
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.ivote_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response" # redirect to https later
    fixed_response {
      content_type = "text/plain"
      message_body = "This is user service"
      status_code  = "404"
    }
  }
}

#resource "aws_lb_listener" "https_listener" {}

resource "aws_lb_target_group" "user_service" {
  name        = "user-service-tg"
  port        = 5004
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip" # awsvpc mode

  health_check {
    path                = "/health"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

# target group will be attached within ASG

resource "aws_lb_listener_rule" "user_service" {
  listener_arn = aws_lb_listener.http_listener.arn # update to https later
  priority     = 10                                # lower numbers are evaluated first

  condition {
    path_pattern {
      values = ["/user/*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.user_service.arn
  }
}
