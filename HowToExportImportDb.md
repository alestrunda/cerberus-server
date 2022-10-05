# How to export/import db

1. spin up docker container with mongo image
   `docker run mongo`

2. connect into that container using bash
   `docker exec -it <container_id> /bin/bash`

3. run the export/import\
   **Export**: `mongodump --uri="host_uri" -d cerberus -o cerberus` - `host_uri` is `DB_URL` from `.env`. Then you can copy the `cerberus` folder from container using `docker cp <container_id>:cerberus .`.\
   **Import**: `mongorestore --uri="host_uri" -d cerberus -o cerberus` (not sure about the command) - `host_uri` is `DB_URL` from `.env` (will need first "cd cerberus").

4. once finished, stop the container `docker stop <container_id>`
