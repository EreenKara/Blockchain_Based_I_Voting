resource "aws_cloudwatch_log_group" "user_service_logs" {
  name              = "/ecs/i-vote/user-service"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "user_service_task" {
  family                   = "user-service-task"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = "512"
  memory                   = "768"

  task_role_arn      = aws_iam_role.ecs_task_role.arn
  execution_role_arn = aws_iam_role.ecs_exe_role.arn

  container_definitions = jsonencode([{
    name      = "user-service-container"
    image     = var.user_service_image_uri
    essential = true
    cpu       = 512
    memory    = 768

    environment = [
      {
        name  = "DB_HOST"
        value = var.db_host
      },
      {
        name  = "DB_PORT"
        value = "5432"
      },
      {
        name  = "DB_USER"
        value = var.db_username
      },
      {
        name  = "DB_PASSWORD"
        value = var.db_password
      },
      {
        name  = "DB_NAME"
        value = var.db_name
      }
    ]

    portMappings = [
      {
        containerPort = 5004,
        hostPort      = 5004,
        protocol      = "tcp"
      }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "${aws_cloudwatch_log_group.user_service_logs.name}"
        "awslogs-region"        = "${var.aws_region}"
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}


resource "aws_ecs_service" "user_service_ecs_service" {
  name                    = "user-service-ecs-service"
  cluster                 = var.ecs_cluster_id
  task_definition         = aws_ecs_task_definition.user_service_task.arn
  desired_count           = 1
  enable_ecs_managed_tags = false
  launch_type             = "EC2" # no cap provider

  tags = {
    Name = "ivote-user-service-ecs-service"
  }
}

