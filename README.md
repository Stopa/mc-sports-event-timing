# Mooncascade take home test: sports event timing

This document describes the applications developed as solution to the [Mooncascade take home test](./Take_home_test.pdf).

The task describes a scenario of sports event times management and requires three applications:

1. Server-side service that receives the timing information
2. Client-side application that displays the information from the service
3. Test client for sending dummy data to the service for demo/test purposes

## Server<a name="server"></a>

### Requirements

* NodeJS
* MongoDB

### Setup

1. Go to the server directory and install the dependencies via NPM:

    ```
    yarn
    ```

    or

    ```
    npm install
    ```

2. Edit `config.json` with the appropriate configuration parameters:
    * `port` - Port on which server will listen to connections (both HTTP and WS)
    * `mongodb` - MongoDB database connection details
      * `host` - Hostname or IP address of the machine hosting the MongoDB database
      * `port` - Port of the MongoDB server on the host machine
      * `database` - Name of the MongoDB database to be used. You should create the database with this name

3. Run the application:

    ```
    yarn run
    ```
    
    or
    
    ```
    npm run-script run
    ``` 

### Description

The server is an application written in NodeJS using the Express.js framework.
It's main function is to receive timing information and relay that to the client.

For this, it exposes the following endpoints:

#### `GET /athletes`

Returns the list of athletes in the database. Currently used by the test client.

#### `GET /times`

Returns the list of timing data between the given time values. Used by the client to receive list of times that were
saved while the client was inactive.

Query parameters:

* `to` - Number. Time, in milliseconds, of the beginning of the time period for which to return times.
* `from` - Number. Time, in milliseconds, of the end of the time period for which to return times.

#### `POST /times`

Records a new time. Sends the data about this time to all of the clients currently listening to WebSocket messages.

The body of the request should be a JSON object with the following data:

* `code` - Code of the athlete
* `timingPoint` - Timing point. Assumed to be either `finishCorridor` or `finishLine`
* `clockTime` - Time (accurate to a fraction of a second)

### Known issues/limitations

None of the endpoints currently really validate the incoming data. This was assumed to be sufficient for the test task,
especially since it was understood to be mostly about the client-side.

## Client

### Requirements

* NodeJS

### Setup

1. Go to the client directory and install the dependencies via NPM:

    ```
    yarn
    ```
    
    or
    
    ```
    npm install
    ```
2. Edit `src/config.json` with the appropriate configuration parameters:
    * `server_url` - Hostname/IP and port of the [server](#server)
3. Run the application:
    ```
    yarn start
    ```
    
    or
    
    ```
    npm run-script start
    ```

### Description

Client is an application bootstrapped with `create-react-app` and written using the React framework and
Redux application state management framework. It connects to the server using the WebSocket API and listens receives new
times in real time. The times are then shown in a table, as described in the [task description](./Take_home_test.pdf).

When the application window is inactive, the WebSocket connection is terminated and the client no longer receives
updates from the server. The timestamp of this event is recorded. When the focus is returned, WebSocket connection is
re-established and the missing times up to the time of re-focus are fetched from the server (`GET /times`). Naturally,
this could also have been alternatively implemented through the WebSocket connection - e.g. sending a message with the
two timestamps to the server, to which it would respond with a list of the missing times.

Because of the client's functionality being paused when the window is inactive, it is recommended to open the dummy
client in another device (e.g. a smartphone - look how _responsive_ that thing is!) to test the applications. 

## Test client

### Requirements

* NodeJS

### Setup

1. Go to the client directory and install the dependencies via NPM:

    ```
    yarn
    ```
    
    or
    
    ```
    npm install
    ```
2. Edit `src/config.json` with the appropriate configuration parameters:
    * `server_url` - Hostname/IP and port of the [server](#server)
3. Run the application:
    ```
    yarn start
    ```
    
    or
    
    ```
    npm run-script start

### Description

Client is an application bootstrapped with `create-react-app` and written using the React framework.

It gets the list of athletes from the server and allows the user to record the times when they enter the finish corridor
and cross the finish line, sending this data to the server that in turn communicates it to the client.

## Testing the solution

* Setup and run all the applications
* Open the client in a web browser
* Open the test client in a web browser, preferably on another device, to leave the client in focus
* Play around with recording the times - take the focus away form the client, play around some more. Go nuts!
* One "session" represents one sports event. If you want to start over, just refresh the client and the test client.

## Notes

All the applications use ESLint to ensure consistent code style. The client-side applications use the popular
Airbnb preset and the NodeJS application uses the base (react-less) Airbnb preset as well as another plugin specifically
meant for Node. Prop validation is done with PropTypes, although typically I'd rather go for Flow or TypeScript.

Because of the simplicity of the task, not a lot of styling is needed and it's bundled directly with the React components.
Typically I prefer to style larger projects with SASS and I've been pretty sceptical about various CSS-in-JS solutions
(Styled Components, CSS Modules, and what have you), although I'm slowly starting to be more open to the idea in certain
contexts.

Redux Thunk middleware is used for asynchronous Redux action creators and general action creator combination.

Moment.js is used for date parsing/display and classnames is used for JSX className manipulation. One might argue that
they weren't necessary for a task of this size, but I just think they're neat.
