import express from "express";
import bodyParser from "body-parser";
import api from './src/Routes/Constructors/api.router.const.js'
import routers from './src/Routes/Constructors/router.const.js'

const app = express();
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