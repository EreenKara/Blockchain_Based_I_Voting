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

# bind all with a service
resource "aws_ecs_service" "user_service_ecs_service" {
  name                    = "user-service-ecs-service"
  cluster                 = var.ecs_cluster_id
  task_definition         = aws_ecs_task_definition.user_service_task.arn
  desired_count           = 2
  enable_ecs_managed_tags = false

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.user_service_cp.name
    weight            = 1
  }

  tags = {
    Name = "ivote-user-service-ecs-service"
  }
}

resource "aws_ecs_capacity_provider" "user_service_cp" {
  name = "user-service-cap-provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.user_service_asg.arn
    managed_scaling {
      status                    = "ENABLED"
      target_capacity           = 75
      minimum_scaling_step_size = 1
      maximum_scaling_step_size = 2
      instance_warmup_period    = 60 # wait 1 min for ec2 to warmup 
    }
    managed_termination_protection = "DISABLED"
  }
  tags = {
    Name = "ivote-user-service-cp"
  }
}
