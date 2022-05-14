variable "account_id" {
	type = number
}

variable "app_name" {
	type    = string
	default = "36-hours"
}

variable "tags" {
	type = map(string)

	default = {
		Owner     = "Harry"
		AppName   = "36-hours-app"
		ManagedBy = "Terraform"
	}
}
