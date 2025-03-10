output "db_endpoint" {
  value = aws_db_instance.postgre_db.endpoint
}

output "postgre_db_instance" {
  value = aws_db_instance.postgre_db
}
