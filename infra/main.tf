provider "aws" {
  profile = "default"
  region  = var.aws_region
}

# computed values
locals {
  ecs_cluster_id   = aws_ecs_cluster.ivote_cluster.id
  ecs_cluster_name = aws_ecs_cluster.ivote_cluster.name
  ecs_ami_id       = data.aws_ami.ecs_optimized.id
}


module "user_service" {
  source = "./modules/user-service"

  aws_region       = var.aws_region
  vpc_id           = module.network.vpc_id
  public_subnet_id = module.network.public_subnet_id

  user_service_image_uri = var.user_service_image_uri
  ecs_cluster_id         = local.ecs_cluster_id
  ecs_cluster_name       = local.ecs_cluster_name

  ecs_ami_id    = local.ecs_ami_id
  instance_type = var.instance_type
}

module "network" {
  source = "./modules/network"

  user_service_instance_id = module.user_service.instance_id
}
