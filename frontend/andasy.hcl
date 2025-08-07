# andasy.hcl app configuration file generated for frontend on Wednesday, 06-Aug-25 17:18:25 SAST
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "frontend"

app {

  env = {
    HOST = "::"
  }

  port = 5000

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "frontend"
  }

}
