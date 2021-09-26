resource "aws_appsync_graphql_api" "api" {
  name = "${var.app_name}-appsync-api"
  authentication_type = "API_KEY"

  schema = file("${path.module}/schema.graphql")
}

resource "aws_appsync_datasource" "api_datasource" {
  api_id = aws_appsync_graphql_api.api.id
  name = "app_36_hours_datasource"
  service_role_arn = aws_iam_role.role_appsync.arn
  type = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.main_table.name
  }
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.api.id
}