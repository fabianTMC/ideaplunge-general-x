/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/express/express.d.ts"/>
/// <reference path="./typings/body-parser/body-parser.d.ts"/>

import * as express from 'express';
import * as bodyParser from "body-parser";

import {Routes} from "./routes/index";

import * as CONFIG from "./config";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Serve static files
app.use(express.static(__dirname + '/public'));

// Define what routes where
let router = new Routes();
app.use("/bases/create", router.bases.create);

app.listen(CONFIG.PORT, function () {
  console.log('Listening on port '+CONFIG.PORT);
});
