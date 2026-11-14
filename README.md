## Calling postgres instances from JavaScript webapps.

# What you need:
NodeJS and NPM installed on your system.

# What to install first.
We have few important dependencies. Install them.
```bash
npm install
```

# The Environ file.
Copy the example:
```bash
cp .env.example .env
```
This will allow us to use secrets later.

# Generate your JWT keys.
Create your keys. Encryption systems won't work without them.
```bash
cd jwt_keys
sh jpi_gen_keys.sh
```

# Docker system.
If you need them, start Postgres and Adminer:
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

# In-depth documentation is in the app itself. Visit:
```bash
https://localhost:3000/docs
```