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
  default = 5 # 5 gb for now
}

variable "db_engine_version" {
  default = "11.22" # supported version for this region
}
