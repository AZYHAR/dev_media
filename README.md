
# [DevMedia](https://dev-media.herokuapp.com)

DevMedia is full stack social media network that gives an opportunity for building new connections with other developers.  

### Implemented functions:

* login and sign up
* create and update personal portfolio  
    * Education info  
    * Work info
    * Social media links
    * List all GitHub projects
* request portfolios of other developers
* create posts
* leave comments below each post

## Heroku  

DevMedia is available on Heroku: https://dev-media.herokuapp.com

## Technologies:  

### Back-end:  

* Node.js  
    * [express](https://expressjs.com) (main framework for backend)
    * [gravatar](https://gravatar.com) (profile avatars connected with email)
    * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (token validation)
    * [mongoose](https://mongoosejs.com) (database interactions)
    * [request](https://www.npmjs.com/package/request) (http request module)
    * [nodemon](https://www.npmjs.com/package/nodemon) (debug tool that track changes and restart node application)
    * [concurrently](https://www.npmjs.com/package/concurrently) (allows to run back+ front end with one command)

### Front-end:

* [React 16.8.6](https://reactjs.org)
* [Redux 7.1.0](https://redux.js.org) (state management tool)
    * [redux-devtools-extension]() (provides working comfortability with Redux)  


## Local installation

#### 1. Clone repository  

```bash
    git clone https://github.com/AZYHAR/dev_media.git
```

#### 2. Install dependencies

```bash
    # Install server dependencies
    npm install

    # Install client dependencies
    cd client
    npm install
```

#### 3. Run front and back end with one line  

```bash
    npm run dev
```

## Authors

**Anton Zyhar**   [azyhar](https://github.com/azyhar)

## License

This project is licensed under the MIT License