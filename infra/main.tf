resource "docker_image" "backend" {
  name = "backend"

  build {
    context = "../"
    dockerfile = "Dockerfile.dev"
  }
}