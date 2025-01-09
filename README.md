# motorInsuranceAPI
This is a personal project build with NodeJS, NestJS and Postgres

> Make sure that you got NodeJS installed
> Project file is in the **master** branch


### Database Connection
>Make sure that you got **Postgresql** installed
- Database connection with TypeORM is configured using PORT: **5432**
- Adjust the connection configuration according to your localhost/server


### Running the Application
> Run the **npm install" command in the cmd before running the application
- Run command **npm run start**
- Application will run on PORT: **3000**


### API Documentation
> For API documentation with **Swagger**: (http://localhost:3000/api)
- To test the protected endpoint, kindly **authorize with Swagger using given jwtoken.** The given token is manually generated which contain metadata (role = admin) once decoded. Token will expire on 31st August 2025. 
