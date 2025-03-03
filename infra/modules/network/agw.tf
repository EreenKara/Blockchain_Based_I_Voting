resource "aws_api_gateway_rest_api" "proxy" {
  name = "ivote-api-proxy"
}

resource "aws_api_gateway_method" "proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.proxy.id
  resource_id   = aws_api_gateway_rest_api.proxy.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_apigatewayv2_integration" "name" {

}
