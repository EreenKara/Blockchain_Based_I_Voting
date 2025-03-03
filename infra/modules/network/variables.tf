variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  type    = string
  default = "10.0.0.1/24"
}

variable "private_subnet_cidr" {
  type    = string
  default = "10.0.0.2/24"
}

variable "availability_zone" {
  type    = string
  default = "eu-north-1b"
}
