# `Adam`

Adam is the entrypoint backends for Coffeewithegg. It is responsible for managing other projects to deploy, run, and monitor them. It can scale down to zero when there is no project running, and scale up when there is a new project to run. The main purpose of Adam is to managing cost and resources for my projects.

# Environment Variables

The following environment variables are required to run Adam:

Database related:

```bash
- `DB_USER`: The username to connect to the database. Default is `postgres`.
- `DB_PASSWORD`: The password to connect to the database. Default is `postgres`.
- `DB_NAME`: The name of the database to connect to. Default is `adam`.
- `DB_HOST`: The host of the database. Default is `localhost`.
- `DB_PORT`: The port of the database. Default is `5432`.

```
