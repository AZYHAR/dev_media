# DevMedia

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

## JWT authentification

Rule: JWT token consist of three parts

### Encoded JWT Token

> <span style="color:pink">
> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
> </span>.  
> <span style="color:violet">  
> eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IiIsImlhdCI6MTUxNjIzOTAyMn0
> </span>.
> <span style="color:lightskyblue">
> m55O-8YDpQbJLIS0ea9Bpb1VulQsOppUSuk10BRh7cc</span>

#### Header (Algorithm, Token Type)

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### Payload (Data)

```json
{
  "sub": "1234567890",
  "name": "",
  "iat": 1516239022
}
```

#### Verify signature

```json
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), [
  your - 256 - bit - secret
])
```

## FrontEnd

Install packages  
npm i

axios => to make http request  
react-router-dom  
redux  
react-redux  
redux-thunk  
redux-devtools-extension  
moment => date and time  
react-moment  
uuid => helps to create id for actions to track them

### Redux

> <span style="color:green">
> Advantages: </span>Prevent from using state manager
