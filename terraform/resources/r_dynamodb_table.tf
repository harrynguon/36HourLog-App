variable "dynamodb_attributes" {
	type    = list(string)
	default = ["DeviceID", "ExpiryDate"]
}

resource "aws_dynamodb_table" "main_table" {
	name      = "${var.app_name}-table"
	hash_key  = element(var.dynamodb_attributes, 0) // Parition key
	range_key = element(var.dynamodb_attributes, 1) // Sort key

	billing_mode   = "PROVISIONED"
	read_capacity  = 20
	write_capacity = 20

	dynamic "attribute" {
		for_each = var.dynamodb_attributes
		content {
			name = attribute.value
			type = "S"
		}
	}

	ttl {
		attribute_name = "TimeToExist"
		enabled        = true
	}

	tags = var.tags
}
