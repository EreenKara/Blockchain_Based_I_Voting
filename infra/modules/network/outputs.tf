output "vpc_id" {
  value = aws_vpc.main.id
}

output "vpc_cidr" {
  value = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}

output "private_cidrs" {
  value = var.private_cidrs
}

output "user_service_target_group_arn" {
  value = aws_lb_target_group.user_service.arn
}
