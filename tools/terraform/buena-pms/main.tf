terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.6.2"
    }

    # postgresql = {
    #   source = "cyrilgdn/postgresql"
    #   version = "1.19.0"
    # }
  }
}

resource "docker_network" "buena-pms-network" {
  name = "buena-pms-network"
}