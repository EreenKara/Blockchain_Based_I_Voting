resource "aws_cloudwatch_log_group" "user_service_logs" {
  name = "/ecs/i-vote/user-service"
}

resource "aws_ecs_task_definition" "user_service_task" {
  family                   = "user-service-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = "496"
  memory                   = "720"

  task_role_arn      = aws_iam_role.ecs_task_role.arn
  execution_role_arn = aws_iam_role.ecs_exe_role.arn

  container_definitions = jsonencode([{
    name      = "user-service-container"
    image     = var.user_service_image_uri
    essential = true
    cpu       = 496
    memory    = 720

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
  desired_count           = 1
  launch_type             = "EC2"
  enable_ecs_managed_tags = false

  network_configuration {
    subnets          = var.public_subnet_ids
    security_groups  = [aws_security_group.user_service_sg.id]
    assign_public_ip = false
  }

}
