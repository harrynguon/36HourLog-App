resource "aws_iam_role" "role_appsync" {
  name = "${var.app_name}-appsync-role"

  assume_role_policy = jsonencode({
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
  })

  tags = var.tags
}

resource "aws_iam_role_policy" "role_policy_appsync" {
  name = "${var.app_name}-appsync-role-policy"
  role = aws_iam_role.role_appsync.id
  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "lambda:InvokeFunction"
        ],
        "Resource": [
          aws_lambda_function.lambda_appsync_resolver.arn
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ],
        "Resource": "arn:aws:logs:${var.region}:${var.account_id}:*"
      }
    ]
  })
}

resource "aws_iam_role" "role_resolver_lambda" {
  name = "${var.app_name}-lambda-resolver-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy" "role_policy_resolver_lambda" {
  name = "${var.app_name}-role-policy-resolver-lambda"
  role = aws_iam_role.role_resolver_lambda.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "lambda:InvokeFunction"
        ],
        "Resource": [
          aws_lambda_function.lambda_appsync_resolver.arn
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:ListTables"
        ],
        "Resource": aws_dynamodb_table.main_table.arn
      },
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogStream",
          "logs:CreateLogGroup",
          "logs:PutLogEvents"
        ],
        "Resource": "arn:aws:logs:${var.region}:${var.account_id}:*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "ssm:GetParametersByPath"
        ],
        "Resource": "arn:aws:ssm:${var.region}:${var.account_id}:parameter/"
      }
    ]
  })
}

resource "aws_iam_role" "cognito_unauthenticated_role" {
  name = "${var.app_name}-cognito-unauthenticated-role"
  
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "cognito-identity.amazonaws.com"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
          "StringEquals": {
            "cognito-identity.amazonaws.com:aud": aws_cognito_identity_pool.cognito_pool.id
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "unauthenticated"
          }
        }
      }
    ]
  })
  tags = var.tags
}

resource "aws_iam_role_policy" "cognito_unauthenticated_role_policy" {
  name = "${var.app_name}-cognito-unauthenticated-role-policy"
  role   = aws_iam_role.cognito_unauthenticated_role.id
  
  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "mobileanalytics:PutEvents"
#          "cognito-sync:*"
        ],
        "Resource": [
          "*"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "appsync:GraphQL"
        ],
        "Resource": [
          "*"
        ]
      }
    ]
  })
}