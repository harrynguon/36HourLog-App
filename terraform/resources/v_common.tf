variable "app_name" {
  type = string
}

variable "attributes" {
  type = list(string)
  default = ["DeviceID", "ExpiryDate"]
}