terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 2.63.0"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.aws_region
}

resource "aws_ecs_cluster" "ivote_cluster" {
  name = "i-vote-ecs-cluster"
}

resource "aws_ecs_cluster_capacity_providers" "ivote_cluster_cps" {
  cluster_name = aws_ecs_cluster.ivote_cluster.name

  capacity_providers = [
    module.postgre_db.postgre_cp_name,
    module.user_service.user_service_cp_name
  ]
}

# computed values
locals {
  ecs_cluster_id   = aws_ecs_cluster.ivote_cluster.id
  ecs_cluster_name = aws_ecs_cluster.ivote_cluster.name
  ecs_ami_id       = data.aws_ami.ecs_optimized.id
}

module "network" {
  source = "./modules/network"

}

module "postgre_db" {
  source = "./modules/postgre-db"

  aws_region = var.aws_region

  azs           = module.network.azs
  vpc_id        = module.network.vpc_id
  subnet_ids    = module.network.private_subnet_ids
  private_cidrs = module.network.private_cidrs

  ecs_cluster_id   = local.ecs_cluster_id
  ecs_cluster_name = local.ecs_cluster_name
  ecs_ami_id       = local.ecs_ami_id
  instance_type    = var.instance_type

  db_name     = var.db_name
  db_username = var.db_username
  db_password = var.db_password
}

module "user_service" {
  source = "./modules/user-service"

  vpc_id                        = module.network.vpc_id
  vpc_cidr                      = module.network.vpc_cidr
  subnet_ids                    = module.network.private_subnet_ids
  user_service_target_group_arn = module.network.user_service_target_group_arn

  aws_region             = var.aws_region
  instance_type          = var.instance_type
  user_service_image_uri = var.user_service_image_uri

  ecs_cluster_id   = local.ecs_cluster_id
  ecs_cluster_name = local.ecs_cluster_name
  ecs_ami_id       = local.ecs_ami_id

  db_host     = module.postgre_db.postgre_dns_name
  db_name     = var.db_name
  db_username = var.db_username
  db_password = var.db_password
}

