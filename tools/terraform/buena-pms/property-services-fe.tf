resource "docker_image" "property-services-fe" {
  name = "property-services-fe:0.0.1"

  build {
    context    = "../../."
    dockerfile = "./packages/property-service-fe/Dockerfile"
  }
}

resource "docker_container" "property-services-fe" {
  name  = "property-services-fe"
  image = docker_image.property-services-fe.image_id
  logs = true
  # must_run   = false   # Don't treat exit as a failure
  # rm         = false   # Don't delete on exit

  depends_on = [docker_container.property-services-be]

  ports {
    internal = 8080
    external = 8080
  }

  labels {
    label = "com.docker.compose.project"
    value = "buena-pms-app"
  }

  env = [
    "API_HOST=${docker_container.property-services-be.name}",
    "API_PORT=${docker_container.property-services-be.ports[0].internal}"
  ]

  # lifecycle {
  #   prevent_destroy = true
  # }

  networks_advanced {
    name = docker_network.buena-pms-network.name
  }
}
