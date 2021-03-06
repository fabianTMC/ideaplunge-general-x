/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/express/express.d.ts"/>
/// <reference path="./typings/body-parser/body-parser.d.ts"/>

import * as path from "path";
import * as express from 'express';
import * as bodyParser from "body-parser";

import {Routes} from "./routes/index";

import * as CONFIG from "./config";
import * as MongoDB from "mongodb";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Serve static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

// Connect to MongoDB
new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
  if(err) {
      throw err;
  } else {
      console.log("Connected to MONDODB_SERVER: "+CONFIG.MONDODB_SERVER);

     // Enforce index on the bases collection
     db.collection('bases').createIndex({latitude: 1, longitude: 1}, {unique:true, background:true}, (err, indexName) => {
         if(err) {
             console.log("An error occurred while trying to enforce the index for the bases collection.");
             console.log(err);
         }
     });

     // Enforce index on the spaceships collection
     db.collection('spaceships').createIndex({name: 1}, {unique:true, background:true}, (err, indexName) => {
         if(err) {
             console.log("An error occurred while trying to enforce the index for the spaceships collection.");
             console.log(err);
         }
     });

      // Define what routes where
      let routes = new Routes(app, db);

      app.listen(CONFIG.PORT, function () {
        console.log('Listening on port '+CONFIG.PORT);
      });
  }
});
