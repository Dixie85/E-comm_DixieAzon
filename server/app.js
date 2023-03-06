import express from "express";
import bodyParser from "body-parser";
import api from './src/Routes/Constructors/api.router.const.js'
import routers from './src/Routes/Constructors/router.const.js'
import * as dotenv from 'dotenv'
import corsOptions from "./src/Config/corsOptions.js";
import credentials from "./src/Middleware/credentials.js";
import cors from 'cors'

dotenv.config()

const app = express();

app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api)
app.use(routers)

//get all with storeId :something

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});

export default app