# Upcoming Movies Web App
This is a MVP project to list upcoming movies integrate with [The Movie Database](http://breakdance.io).

# Libraries used!
  - [ReactJS](https://reactjs.org/)
    * [Create React App](https://github.com/facebook/create-react-app)
  - [Redux](https://redux.js.org/)
  - [Lumen](https://lumen.laravel.com/)
    * [Guzzle](https://github.com/guzzle/guzzle)
 
# Architecture
This solution was split into Front and Backend.
The **business layer** was made using *Lumen* and *MVC* architecture to be able to separate the responsabilities, once it was necessary to abstract the access to the data, as they are being provided by **TMDb**. To get the data was used *Guzzle PHP Http Client*.
In order to improve the User Experience was used caching techniques to not overload the *TMDb Service.*

The **presentation layer** was made using *ReactJS* and *Redux* to be able to better manage the application state. It was used *React Router* to manage the routes and navigation experience in app.

### Installing

**API** requirements is here: https://lumen.laravel.com/docs
```sh
$ cd api
$ php -S localhost:5150 -t public
```

*Remember that you have to set up the API_URL settings in */app/src/index.js*:
```js 
window.API_URL = 'http://localhost:5150/api/v1';
```
**APP** requirements: [Node.js](https://nodejs.org/) v8.15.1+ to run.
Install the dependencies and devDependencies and start the server:
```sh
$ cd app
$ npm install
$ npm start
```
For production environments:

```sh
$ cd app
$ npm run build
```

#### Building for source
For production release:
```sh
$ npm run build
```

### Using Docker
Upcoming Movies is available in Docker Hub.

This will get the image:
```sh
docker pull jonasantonelli/upcoming-movies 
```

This will run your image:
```sh
docker run -r --rm -p 80:80 jonasantonelli/upcoming-movies
```

Verify the deployment by navigating to your server address in your preferred browser.
```sh
http://localhost
```

### Todos
 - Write Tests
 - Apply Page transition animation
 - Nginx 

License
----

MIT

**Free Software, Hell Yeah!**
