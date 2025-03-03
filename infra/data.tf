data "aws_ssm_parameter" "ecs_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

data "aws_ami" "ecs_optimized" {
  most_recent = true
  filter {
    name   = "image-id"
    values = [data.aws_ssm_parameter.ecs_ami.value]
  }
}
