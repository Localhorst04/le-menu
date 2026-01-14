<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/Localhorst04/le-menu/blob/master/LeMenu%20Logo.png" width="360" alt="Le Menu Logo" /></a>
</p>

  <p align="center">Le Menu Backend
    <p align="center">
    
## Description

## Start the Project with Docker

 _NOTE_
 Use `--build` when:
 - you run the project for the first time,
 - the `Dockerfile` or `docker-compose*.yml` build settings changed,
 - dependencies changed (`package*.json`, lockfile),
 - or the image should pick up updated base images.

## First setup
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

## Normal Start
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

## Stop Docker
```bash
docker compose \
-f docker-compose.yml \
-f docker-compose.prod.yml \
down
```

## To quickly find into any container terminal
Find the the you ned service (for example backend):
```bash
docker compose ps
```

Open a shell in the specified container:
```bash
docker compose exec backend sh
```

## Prisma
### Run migrations (creates/updates DB tables)
This applies Prisma migrations to your Postgres database (generated from `schema.prisma`).

```bash
npx prisma migrate dev
```

To generate the Prisma Client and models, run prisma generate
_Note: Docker may already handle this automatically._

```bash
npx prisma generate
```

--------------------------------------------------------------------

## Npm standard readme, will be changed later 

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
