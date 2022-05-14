terraform {
	backend "s3" {
		bucket = "terraform-states-hub"
		key    = "projects/36-hours/terraform/terraform.tfstate"
		region = "ap-southeast-2"
	}

	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "~> 3.0"
		}
	}
}

provider "aws" {
	region = "ap-southeast-2"

	assume_role {
		role_arn     = "arn:aws:iam::${var.account_id}:role/Terraform-Admin"
		session_name = "terraform-harry"
	}
}

module "aws_resources" {
	source = ".//resources"

	account_id = var.account_id
	region     = "ap-southeast-2"

	app_name = var.app_name

	tags = var.tags
}
