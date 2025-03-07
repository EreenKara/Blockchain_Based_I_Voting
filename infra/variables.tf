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
  default = "postgre-db"
}
variable "db_username" {
  default = "postgres"
}
variable "db_password" {
  default = "123456"
}
