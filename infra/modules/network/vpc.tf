resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    "Name" = "i-vote-vpc"
  }
}

resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_cidrs[count.index]
  availability_zone       = var.azs[count.index]
  map_public_ip_on_launch = true

  tags = {
    "Name" = "i-vote-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.private_cidrs[count.index]
  availability_zone       = var.azs[count.index]
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
