# For some reason AWS_IAM authentication with AppSync doesn't work with this policy.
# Can't figure out what other permissions it needs outside of appsync:*, so will use API_KEY authentication for now.

#resource "aws_iam_user" "api_consumer_user" {
#  name = "${var.app_name}-api-consumer"
#  
#  tags = var.tags
#}
#
#resource "aws_iam_user_policy" "api_consumer_user_policy" {
#  name = "${var.app_name}-api-consumer-policy"
#  user = aws_iam_user.api_consumer_user.name
#  
#  policy = jsonencode({
#    "Version": "2012-10-17",
#    "Statement": [
#      {
#        "Action": [
#          "appsync:GetGraphqlApi",
#          "appsync:GraphQL"
#        ],
#        "Effect": "Allow",
#        "Resource": aws_appsync_graphql_api.api.arn
#      }
#    ]
#  })
#}