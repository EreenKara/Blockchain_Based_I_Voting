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
