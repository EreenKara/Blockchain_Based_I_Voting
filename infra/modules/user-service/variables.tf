variable "aws_region" {}

variable "vpc_id" {}
variable "vpc_cidr" {}
variable "subnet_ids" {}

variable "ecs_cluster_id" {}
variable "ecs_cluster_name" {}
variable "user_service_image_uri" {}

variable "ecs_ami_id" {}
variable "instance_type" {}

variable "user_service_target_group_arn" {}

variable "db_host" {}
variable "db_name" {}
variable "db_username" {}
variable "db_password" {}
