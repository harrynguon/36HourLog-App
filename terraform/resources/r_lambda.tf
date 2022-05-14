resource "aws_lambda_function" "lambda_appsync_resolver" {
	function_name = "${var.app_name}-resolver-lambda"

	# Get handler name from template lambda tools defaults json
	handler = "ItemResolver.Lambda::ItemResolver.Lambda.Function::FunctionHandler"
	runtime = "dotnetcore3.1"

	s3_bucket = "terraform-states-hub"
	s3_key    = "lambda_placeholder.zip"

	role = aws_iam_role.role_resolver_lambda.arn

	memory_size = 128
	timeout     = 20

	tags = var.tags
}
