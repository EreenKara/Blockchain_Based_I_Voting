output "postgre_dns_name" {
  value = "${aws_ecs_service.postgre_service.name}.${var.ecs_cluster_name}.local"
}

output "postgre_cp_name" {
  value = aws_ecs_capacity_provider.postgre_cp.name
}
