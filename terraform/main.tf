terraform {
  backend "s3" {
    bucket = "terraform-states-hub"
    key    = "projects/36-hours/terraform.tfstate"
    region = "ap-southeast-2"
  }

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"

  assume_role {
    role_arn = "arn:aws:iam::${var.account_id}:role/Terraform-Admin"
    session_name = "terraform-harry"
  }
}

module "api" {
  source = ".//resources"
  app_name = var.app_name
}