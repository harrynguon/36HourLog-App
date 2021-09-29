resource "aws_lambda_function" "lambda_appsync_resolver" {
  function_name = "${var.app_name}-resolver-lambda"

  # From template lambda tools default
  handler = "ItemResolver.Lambda::ItemResolver.Lambda.Function::FunctionHandler"
  runtime = "dotnetcore3.1"

  s3_bucket = "terraform-states-hub"
  s3_key = "lambda_placeholder.zip"

  role = aws_iam_role.role_appsync_resolver_lambda.arn

  tags = var.tags
}