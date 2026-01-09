variable "pms_database_admin" {
  type        = string                     # The type of the variable, in this case a string
  default     = "admin"                 # Default value for the variable
  description = "The type of EC2 instance" # Description of what this variable represents
}

variable "pms_database_admin_password" {
  type        = string                     # The type of the variable, in this case a string
  default     = "password"                 # Default value for the variable
  description = "The type of EC2 instance" # Description of what this variable represents
}

variable "pms_database_name" {
  type        = string                     # The type of the variable, in this case a string
  default     = "buena_pms"                 # Default value for the variable
  description = "The type of EC2 instance" # Description of what this variable represents
}