This is a project created by `create-react-app`, with Node.js server added.

## Main dependencies

server:

* `express` as the http server.
* `mongoDB` as database and `mongoose` as ODM.

client:

* `react`.
* `redux` as state manager.
* `react-router` as the front-end routing tool.
* `axios` as the AJAX handler.
* `bootstrap` as the CSS base.

## Project structure

overview:

```
|-public        # static assets
| |-uploads     # uploaded assets
|
|-server
| |-models      # mongoose models folder
| |-routes      # express api routes folder
| |-mongodb.js  
| |-router.js   
| |-app.js      # express application entry
| |-server.js   # http server entry
|
|-src
| |-components  # reuseable components
| |-pages       # app pages
| |-redux       # redux store & reducers & actions
| |-utils       # util functions
| |-App.css     # main styles
| |-App.js      # main component
| |-index.js    # front-end application entry
|
|-test          # unit tests
```

New routes and models created will be auto required into the application.

## Main implemented functions

1. user login & register
2. houses information list & create (login required)
3. add or cancel favourite to houses (login required)

## Installing

```
$ npm install create-react-app -g
$ npm install
```

## Running The App

### Dev

```
$ npm run start
```

This will create a dev server running on port 3000 with hot reloading.

But actually, the server is listening on port 3001, to avoid cross domain issue, the project used `proxy` option provided by `create-react-app` to proxy ajax requests ([Proxying API Requests in Development](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development)).


### Production

```
$ npm run build
$ node server/server.js
```

Build static files for production, then start `server.js`, project will run on port 3001.
