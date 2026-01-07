# buena-case-study
Buena Interview case study for property management

Technologies and tools used

1. Monorepo - Lerna
2. Backend - NestJS
3. FrontEnd - Next.js
4. Database - postgres
5. Deployment - Docker compose & Terraform(In progress)

## Local setup:
```
1. npm install -g lerna or npx lerna init
2. lerna run build ( This will compile both backend and frontend application)
3. Start a posrgres server (schema generation and database details are a in .env file)
```

## Run Backend:
```
cd <GIT_HOME>/packages/property-service-be
npm run start (without watch)
npm run start:dev ( with watch) - Application start will create the required database tables and user data(with seed service)
npm run start (for production)
```
Application URL - http://localhost:3000 \
Swagger URL - http://localhost:3000/swagger \
Open API URL - http://localhost:3000/swagger/json

## Run Frontend
```aiignore
cd <GIT_HOME>/packages/property-service-fe
npm run dev ( Package json is configured to start the server in port 8080)
npm run start (Production run)
```
>If required change the backend port with ENV props API_HOST & API_PORT

Frontend URL : http://localhost:8080

## Docker run:
```aiignore
docker compose --profile production up -d
```
> All the necessary images are built and the application will run the same above mentioned ports


## Design
> The backend model design [Link](https://github.com/sujai1009/buena-case-study/tree/main/design_diagrams)
> 
> [An explanation video link](https://github.com/sujai1009/buena-case-study/explanation_video.mov)