// Allow an AppSync resource to assume this role
resource "aws_iam_role" "role_appsync" {

  name = "${var.app_name}-appsync-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

// Allow appsync role assumers to perform DynamoDB actions on that specific dynamoDB
resource "aws_iam_role_policy" "role_policy_appsync" {
  name = "${var.app_name}-appsync-role-policy"
  role = aws_iam_role.role_appsync.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_dynamodb_table.main_table.arn}"
      ]
    }
  ]
}
EOF
}