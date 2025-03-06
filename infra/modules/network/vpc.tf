resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    "Name" = "i-vote-vpc"
  }
}

resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = count.index == 0 ? var.public_cidr1 : var.public_cidr2
  availability_zone       = count.index == 0 ? var.az1 : var.az2
  map_public_ip_on_launch = true

  tags = {
    "Name" = "i-vote-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = count.index == 0 ? var.private_cidr1 : var.private_cidr2
  availability_zone       = count.index == 0 ? var.az1 : var.az2
  map_public_ip_on_launch = false

  tags = {
    "Name" = "i-vote-private-subnet-${count.index + 1}"
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
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
