output "vpc_id" {
  value = aws_vpc.main.id
}

output "vpc_cidr" {
  value = aws_vpc.main.cidr_block
}

output "az1" {
  value = var.az1
}

output "az2" {
  value = var.az2
}

output "public_subnet1_id" {
  value = aws_subnet.public1.id
}

output "private_subnet1_id" {
  value = aws_subnet.private1.id
}

output "private_subnet2_id" {
  value = aws_subnet.private2.id
}


output "user_service_listener" {
  value = aws_lb_listener.user_service
}

output "user_service_tg_arn" {
  value = aws_lb_target_group.user_service.arn
}
