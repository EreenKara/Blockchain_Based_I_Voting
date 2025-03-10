output "vpc_id" {
  value = aws_vpc.main.id
}

output "vpc_cidr" {
  value = aws_vpc.main.cidr_block
}

output "azs" {
  value = var.azs
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}


output "user_service_target_group_arn" {
  value = aws_lb_target_group.user_service.arn
}
