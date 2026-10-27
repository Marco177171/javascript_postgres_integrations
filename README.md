Calling postgres instances from JavaScript webapps.

What you need:
NodeJS and NPM installed on your system.

What to install first.
We have few important dependencies:
```bash
npm install postgres
```

Env file.
Copy the example:
```bash
cp .env.example .env
```
This will allow us to use secrets later.

How to run the server.
From the root of the project:
```bash
node --env-file=.env server.js
```
Or simply...
```bash
npm start
```