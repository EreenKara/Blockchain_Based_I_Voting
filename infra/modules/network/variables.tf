variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_cidr1" {
  type    = string
  default = "10.0.1.0/24"
}

variable "public_cidr2" {
  type    = string
  default = "10.0.2.0/24"
}

variable "private_cidr1" {
  type    = string
  default = "10.0.3.0/24"
}

variable "private_cidr2" {
  type    = string
  default = "10.0.4.0/24"
}

variable "az1" {
  type    = string
  default = "eu-north-1b"
}

variable "az2" {
  type    = string
  default = "eu-north-1c"
}
