/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/express/express.d.ts"/>
/// <reference path="./typings/body-parser/body-parser.d.ts"/>

import * as express from 'express';
import * as bodyParser from "body-parser";

import {Routes} from "./routes/index";

import * as CONFIG from "./config";
import * as MongoDB from "mongodb";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Serve static files
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB
new MongoDB.MongoClient.connect(CONFIG.MONDODB_SERVER, (err, db) => {
  if(err) {
      throw err;
  } else {
      console.log("Connected to MONDODB_SERVER: "+CONFIG.MONDODB_SERVER);

      // Define what routes where
      let routes = new Routes(app, db);

      app.listen(CONFIG.PORT, function () {
        console.log('Listening on port '+CONFIG.PORT);
      });
  }
});
