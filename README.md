# Udemy_Practice

#### Initilize package.json

```bash
npm init
```

## Reguar dependencies explonation

```bash
npm i ...
```

express => main framework for backend

express-validator => for data validation

bcrypt.js => password encryption

config => for global variables

gravatar => for profile avatars
if user signs up, they can use an email
that is associated with a gravatar account and it will show their profile image automatically

jsonwebtoken => for jwt to pass along a token validation

mongoos => layer that sits on top of the database so we can interact with it

request => module that allows to make http requests to another API, installing for github repositores. We want our profiles to be able to have GitHub repositores listed on them. So we're going to make that request from our backend so that we can hide our API key and we can just return repositories

## Dev Dependencies

```bash
npm i -D ...
```

nodemon => will constantly watch our server
so we don`t have to refresh it every time we make a change

concurrently => allow us to run our back-end express server and front-end react server at the same time with one single command
