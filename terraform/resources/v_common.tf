variable "app_name" {
  type = string
  default = "36-hours"
}

variable "attributes" {
  type = list(string)
  default = ["DeviceID", "ExpiryDate"]
}