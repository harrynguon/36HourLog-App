terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

locals {
  region = "ap-southeast-2"
}

variable "account_id" {
  type = number
}

provider "aws" {
  region = local.region

  assume_role {
    role_arn = "arn:aws:iam::${var.account_id}:role/Terraform-Admin"
    session_name = "terraform-harry"
  }
}

module "api" {
  source = ".//resources"
}