resource "aws_security_group" "rds_sg" {
  name        = "rds-sec-group"
  description = "Allow traffic to/from RDS"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = var.private_cidrs # internal access only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # all
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "postgre_db" {
  identifier        = "ivote-postgre"
  engine            = "postgres"
  engine_version    = var.db_engine_version
  instance_class    = var.db_instance_class
  allocated_storage = var.db_storage

  username                = var.db_username
  password                = var.db_password
  db_name                 = var.db_name
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.rds_subnet_group.name
  multi_az                = false # true for high availability, if needed
  backup_retention_period = 7
  storage_type            = "gp2"
  publicly_accessible     = false

  tags = {
    Name = "I-Vote Postgresql Db"
  }
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "postgre-subnet-group"
  subnet_ids = var.subnet_ids # attaching the private subnets
}
