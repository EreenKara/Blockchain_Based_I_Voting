variable "vpc_id" {}
variable "subnet_ids" {}
variable "private_cidrs" {}

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
  default = "13.4" # postgresql
}
