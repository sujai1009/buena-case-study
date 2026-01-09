resource "docker_image" "property-services-be" {
  name = "property-services-be:0.0.1"

  build {
    context    = "${path.module}/../../../."
    dockerfile = "./packages/property-service-be/Dockerfile"
  }
}

resource "docker_container" "property-services-be" {
  name  = "property-services-be"
  image = docker_image.property-services-be.image_id
  logs = true
  # must_run   = false   # Don't treat exit as a failure
  # rm         = false   # Don't delete on exit

  depends_on = [docker_container.buena_pms_postgres]

  ports {
    internal = 3000
    external = 3000
  }

  labels {
    label = "com.docker.compose.project"
    value = "buena-pms-app"
  }

  env = [
    "POSTGRES_HOST=${docker_container.buena_pms_postgres.name}",
  ]

  # lifecycle {
  #   prevent_destroy = true
  # }

  networks_advanced {
    name = docker_network.buena-pms-network.name
  }
}
