resource "aws_security_group" "alb_sg" {
  name   = "alb-sec-group"
  vpc_id = aws_vpc.main.id

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
    Name = "ivote-sec-group"
  }
}

resource "aws_lb" "ivote_alb" {
  name               = "ivote-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public1.id, aws_subnet.public2.id]

  enable_deletion_protection       = false
  enable_cross_zone_load_balancing = false
  idle_timeout                     = 120

  tags = {
    Name = "ivote-alb"
  }
}

resource "aws_lb_target_group" "user_service" {
  name        = "ecs-user-service-tg"
  vpc_id      = aws_vpc.main.id
  port        = 5004 # service listens on this port
  target_type = "ip"
  protocol    = "HTTP"

  health_check {
    interval            = 30
    path                = "/health"
    protocol            = "HTTP"
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = "ivote-user-service-tg"
  }
}

resource "aws_lb_listener" "user_service" {
  load_balancer_arn = aws_lb.ivote_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      status_code  = 200
      content_type = "text/plain"
      message_body = "This is user service"
    }
  }

  tags = {
    Name = "ivote-user-service-listener"
  }
}

resource "aws_lb_listener_rule" "user_service" {
  listener_arn = aws_lb_listener.user_service.arn
  priority     = 10

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.user_service.arn
  }

  condition {
    path_pattern {
      values = ["/user/*"]
    }
  }
}
