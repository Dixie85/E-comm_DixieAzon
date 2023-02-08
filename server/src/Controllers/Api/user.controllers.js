import db from "../../../database.js";
import md5 from "md5";

//Get all users endpoint
export const allUsers = (req, res, next) => {
  const sql = "select * from UserData";
  const params = [];
  db.all(sql, params, (err, rows) => {
      if (err) {
          res.status(400).json({"error":err.message});
          return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
  });
};

//Get specific user by id endpoint
export const userById = (req, res, next) => {
  const sql = "select * from UserData where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
      if (err) {
          res.status(400).json({"error":err.message});
          return;
      }
      res.json({
          "message":"success",
          "data":row
      })
  });
};

//Post a new user endpoint
export const createNewUser = (req, res, next) => {
  const errors=[];
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (!req.body.email){
      errors.push("No email specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  const data = {
      name: req.body.name,
      email: req.body.email,
      password : md5(req.body.password)
  }
  const sql ='INSERT INTO UserData (name, email, password) VALUES (?,?,?)'
  const params =[data.name, data.email, data.password]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
}

//Patch a specific user
export const updateUser = (req, res, next) => {
  const data = {
      email: req.body.email,
      password : req.body.password,
      role : req.body.role,
      storeId: req.body.storeId
  }
  db.run(
      `UPDATE UserData set 
         email = COALESCE(?,email), 
         password = COALESCE(?,password)
         role = COALESCE(?,role)
         storeId = COALESCE(?,storeId)
         WHERE id = ?`,
      [data.email, data.password, data.role, data.storeId, req.params.id],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          })
      });
};

//Delete a specific user
export const deleteUser = (req, res, next) => {
  db.run(
      'DELETE FROM UserData WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", changes: this.changes})
      });
};