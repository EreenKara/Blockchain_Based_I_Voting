output "user_service_public_ip" {
  depends_on = [data.aws_instances.user_service]
  value      = data.aws_instances.user_service.public_ips[0]
}
