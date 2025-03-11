resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    "Name" = "ivote-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_cidr
  availability_zone       = var.az1
  map_public_ip_on_launch = true

  tags = {
    "Name" = "ivote-public-subnet"
  }
}

resource "aws_subnet" "private1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.private_cidr1
  availability_zone       = var.az1
  map_public_ip_on_launch = false

  tags = {
    "Name" = "ivote-private-subnet-1"
  }
}

resource "aws_subnet" "private2" { # second private subnet, RDS requires it
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.private_cidr2
  availability_zone       = var.az2
  map_public_ip_on_launch = false

  tags = {
    "Name" = "ivote-private-subnet-2"
  }
}

resource "aws_internet_gateway" "ivote_igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "ivote-internet-gateway"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ivote_igw.id
  }
  tags = {
    Name = "ivote-internet-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}
