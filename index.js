if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import 'dotenv/config';

// import { variable } from '../app/config/environment_variable';

const app = express();
const ioServer = http.createServer(app);
const env = process.env.NODE_ENV || 'development';

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected to Google Forms API');
  });

// allowed cross domain
// var allowCrossDomain = function(req, res, next) {
//   var allowedHost = [
//     'http://localhost',
//     'http://localhost:8000',
//     'http://localhost:3000',
//     'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'
//   ];
//   res.header('Access-Control-Allow-Origin', '*')
//   const postmanRequest = (typeof(req.query.json) != 'undefined') ? true : false;

//   console.log("----------------------------")
//   console.log("Origin: ", req.headers.origin);
//   console.log("Session: ", req.session);

//   if(!postmanRequest){
//     if(allowedHost.indexOf(req.headers.origin) !== -1) {
//       res.header('Cache-Control', 'no-cache');
//       res.header('Access-Control-Allow-Credentials', true);
//       res.header('Access-Control-Allow-Origin', req.headers.origin)
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'access-control-allow-credentials,access-control-allow-origin,authorization,content-type,x-xsrf-token,x_csrftoken,X-Requested-With');
//       next();
//     } else {
//       if(env != 'development') {
//         console.log("Failed the CORS origin test.");
//         res.send(401, { auth: false });
//       } else {
//         res.header('Access-Control-Allow-Origin', '*');
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//         res.header('Access-Control-Allow-Headers', 'access-control-allow-credentials,access-control-allow-origin,authorization,content-type,x-xsrf-token,x_csrftoken,X-Requested-With');
//       }
//       next();
//     }
//   }
// }

app.use(cors());

app.use('/assets', express.static('./public/users'));
app.use('/output', express.static('./public/output'));

import passport from 'passport';
// const rootPath = (global.rootPath = path.resolve(__dirname, './'));
// const basePath = (global.basePath = variable[env].DOMAIN);
import bearerToken from 'express-bearer-token';

app.use(
  bearerToken({
    bodyKey: 'accessToken',
    queryKey: 'accessToken',
    headerKey: 'Bearer',
    reqKey: 'token',
  })
);

const port = process.env.PORT || 3000;
const uri = 'http://127.0.0.1:' + port;

// serve pure static assets
const staticPath = '/static';

app.use(staticPath, express.static('./dist/static'));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json({ limit: '5mb' }));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// app.set('view engine', 'html');
// app.set('views', './dist/');

app.use(passport.initialize());
app.use(passport.session());

import indexRouter from './app/routes/index.js';

app.use('/', indexRouter);

const server = ioServer.listen(port);

console.log('> Listening at ' + uri + '\n');

// socket server
const io = new Server(server);
