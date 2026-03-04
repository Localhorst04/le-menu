<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/Localhorst04/le-menu/blob/master/LeMenu%20Logo.png" width="360" alt="Le Menu Logo" /></a>
</p>

<h1 align="center">Le Menu Backend</h1>

## Description
Backend API for the Le Menu project (NestJS + PostgreSQL + Prisma).

## Start the Project with Docker

**Requirements:** 
- Docker + Docker Compose
- Environment variables set up. If you are not sure, take a look at `.env.example` and follow comments ^^

_NOTE:_ Use `--build` when:
- you run the project for the first time,
- the `Dockerfile` or any `docker-compose*.yml` build settings changed,
- dependencies changed (`package*.json` / lockfile),
- or you want to rebuild with updated base images.

## Development (first setup)
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

## Developent(normal start)
```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.dev.yml \
up -d
```

### Production environment
```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.prod.yml \
up -d --build
```

## Stop Containers
_in Production use .prod_
```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.dev.yml \
down
```

## Open a shell in docker container
List running services (in this example we choose backend)
```bash
docker compose ps
```

Open a shell inside specified container:
```bash
docker compose exec backend sh
```

## Prisma
### Run migrations (creates/updates DB tables)
This applies Prisma migrations to your Postgres database (generated from `schema.prisma`).
```bash
npx prisma migrate dev
```

Generate Prisma Client (types + client models)
_Note: Docker may already handle this automatically._
```bash
npx prisma generate
```

### Seed
Populates the database with mock data for development and testing, as defined in `prisma/seed.ts`.

```bash
npx prisma db seed
```

## Debugging
**Logs:** 
Find running services
```bash
docker compose ps
```

View logs
(use `-f` to follow)
```bash
docker logs NAME
```

**SwaggerUI**
To test APIs
Available at: http://localhost:3000/api/docs
