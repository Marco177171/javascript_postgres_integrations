## Calling postgres instances from JavaScript webapps.

# What you need:
NodeJS and NPM installed on your system.

# What to install first.
We have few important dependencies:
```bash
npm install postgres
```

# The Environ file.
Copy the example:
```bash
cp .env.example .env
```
This will allow us to use secrets later.

# Docker system.
Run Postgres and Adminer to test:
```bash
docker compose up --build
```

# How to run the local server.
From the root of the project:
```bash
node --env-file=.env server.js
```
Or simply...
```bash
npm start
```
