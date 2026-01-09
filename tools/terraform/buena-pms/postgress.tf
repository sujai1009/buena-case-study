# Pull the official Postgres image
resource "docker_image" "buena_pms_postgres" {
  name         = "postgres:15.15"
  keep_locally = false
}

# Create the Postgres container
resource "docker_container" "buena_pms_postgres" {
  name  = "buena_pms_database"
  image = docker_image.buena_pms_postgres.image_id

  labels {
    label = "com.docker.compose.project"
    value = "buena-pms-app"
  }

  # Essential environment variables for initialization
  env = [
    "POSTGRES_USER=${var.pms_database_admin}",
    "POSTGRES_PASSWORD=${var.pms_database_admin_password}",
    "POSTGRES_DB=${var.pms_database_name}"
  ]

  # Map local init.sql to the special initialization directory
  # Note: Use absolute paths or path references
  upload {
    source = "${path.module}/../../database/init.sql"
    file   = "/docker-entrypoint-initdb.d/init.sql"
  }

  # Map container port 5432 to host port 5432
  ports {
    internal = 5432
    external = 5432
  }

  # Optional: Persist data using a volume
  volumes {
    container_path = "/var/lib/postgresql/data"
    volume_name    = docker_volume.postgres_data.name
  }

  networks_advanced {
    name = docker_network.buena-pms-network.name
  }
}

resource "docker_volume" "postgres_data" {
  name = "postgres_data"
}