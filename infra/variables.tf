variable "user_service_image_uri" {
  description = "User Service Docker image URI"
  type        = string
}

variable "aws_region" {
  type = string
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "db_name" {
  default = "ivotedb"
}
variable "db_username" {
  default = "postgres"
}
variable "db_password" {
  default = "Admin123-"
}

variable "db_host" {
  default = "ivote-postgre.cfcw48gec8ko.eu-north-1.rds.amazonaws.com"
}
variable "db_port" {
  default = "5432"
}
