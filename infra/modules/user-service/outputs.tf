output "user_service_public_ip" {
  depends_on = [data.aws_instances.user_service]
  value      = data.aws_instances.user_service.public_ips[0]
}

output "user_service_sg_id" {
  value = aws_security_group.user_service_sg.id
}
