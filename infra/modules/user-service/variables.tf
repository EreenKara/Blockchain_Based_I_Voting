variable "aws_region" {}

variable "vpc_id" {}
variable "vpc_cidr" {}

variable "public_subnet_id" {}

variable "ecs_cluster_id" {}
variable "ecs_cluster_name" {}
variable "user_service_image_uri" {}

variable "ecs_ami_id" {}
variable "instance_type" {}

variable "user_service_listener" {}
variable "user_service_tg_arn" {}

variable "postgre_db_instance" {}
variable "db_host" {}
variable "db_port" {}
variable "db_name" {}
variable "db_username" {}
variable "db_password" {}
