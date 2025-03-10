resource "aws_apigatewayv2_api" "apigw" {
  name          = "ivote-api-gateway"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "dev_stage" {
  api_id = aws_apigatewayv2_api.apigw.id
  name   = "dev"
}

resource "aws_apigatewayv2_integration" "user_service" {
  api_id             = aws_apigatewayv2_api.apigw.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "http://${var.user_service_public_ip}:5004"
  connection_type    = "INTERNET"
  integration_method = "ANY"
}

resource "aws_apigatewayv2_route" "user_service_route" {
  api_id    = aws_apigatewayv2_api.apigw.id
  route_key = "ANY /user/{proxy+}" # path-based routing
  target    = "integrations/${aws_apigatewayv2_integration.user_service.id}"
}
