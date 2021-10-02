resource "aws_appsync_graphql_api" "api" {
  name = "${var.app_name}-appsync-api"
  authentication_type = "API_KEY"

  schema = file("${path.module}/schema.graphql")

  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.role_appsync.arn
    field_log_level = "ERROR"
    exclude_verbose_content = true
  }

  tags = var.tags
}

resource "aws_appsync_datasource" "api_datasource" {
  api_id = aws_appsync_graphql_api.api.id
  name = "app_36_hours_datasource"
  service_role_arn = aws_iam_role.role_appsync.arn

  type = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_appsync_resolver.arn
  }
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.api.id
}