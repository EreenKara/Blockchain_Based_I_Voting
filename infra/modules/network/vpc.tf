resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    "Name" = "i-vote-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true # encure public ip for agw

  tags = {
    "Name" = "i-vote-public-subnet"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.private_subnet_cidr
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = false

  tags = {
    "Name" = "i-vote-private-subnet"
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
    Name = "ivote-internet-route-table"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public.id
}
