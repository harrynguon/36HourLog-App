resource "aws_cognito_identity_pool" "cognito_pool" {
  identity_pool_name = "${var.app_name}-cognito-pool"
  
  allow_unauthenticated_identities = true
  allow_classic_flow = false
  
  tags = var.tags
}

resource "aws_cognito_user_pool" "cognito_user_pool" {
  name = "tester"
}

resource "aws_cognito_identity_pool_roles_attachment" "cognito_pool_unauthenticated_role_attachment" {
  identity_pool_id = aws_cognito_identity_pool.cognito_pool.id
  
  roles = {
    "unauthenticated" = aws_iam_role.cognito_unauthenticated_role.arn
  }
}