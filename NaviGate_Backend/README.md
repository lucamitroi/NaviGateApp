# NaviGate Backend

This backend was developed using ASP.NET 9.0

## MSSQL Database

To create the database locally run the sqlQueries.sql file in an environment capable of creating MSSQL databases

## Development server

To start a local development server, run:

```bash
dotnet watch run
```

Once the server is running, open your browser and navigate to `http://localhost:5000/swagger/index.html`. There you can see all the endpoints. Most of them are protected so you need to run them using an application like Postman and have an authentication token that you can get by creating a user and login in with that user.

![screenshot_9](https://github.com/user-attachments/assets/8c53386c-1304-4b2e-9a10-bab65d663a61)

