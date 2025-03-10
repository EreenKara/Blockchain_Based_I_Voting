variable "vpc_id" {}
variable "vpc_cidr" {}
variable "az" {}
variable "private_subnet1_id" {}
variable "private_subnet2_id" {}

variable "db_name" {}
variable "db_username" {}
variable "db_password" {}

variable "db_instance_class" {
  default = "db.t3.micro"
}

variable "db_storage" {
  default = 10 # 10 gb for now
}

variable "db_engine_version" {
  default = "17.2"
}
