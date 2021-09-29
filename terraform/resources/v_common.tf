variable "account_id" {
  type = string
}

variable "region" {
  type = string
}

variable "app_name" {
  type = string
}

variable "attributes" {
  type = list(string)
  default = ["DeviceID", "ExpiryDate"]
}