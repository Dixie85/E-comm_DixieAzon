import db from "../../../database.js";
import {randomUUID} from 'crypto'

//Get all products endpoint
export const allProducts = (req, res, next) => {
  const sql = "select * from ProductData";
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

//Get specific product by id endpoint
export const productById = (req, res, next) => {
  const sql = "select * from ProductData where id = ?";
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


export const addNewProduct = (req, res, next) => {
    const {title, quantity, price, category, imageUrl, description, storeId} = req.body;
    console.log(req.body, 'req.body');
    const sql =
    "INSERT INTO ProductData (id, title, quantity, price, category, imageUrl, description, storeId) VALUES (?,?,?,?,?,?,?,?)";
    const params = [randomUUID() ,title, quantity, price, category, imageUrl, description, storeId];
    console.log(params,'params');
    const result = db.run(sql, params, function (err, result) {
    if (err) {
        console.log(err, 'ERRRRRRROOOORRR');
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: result,
      // id: this.lastID,
    });
  });
};

 

export const updateQuantity = (req, res, next) => {
  const { quantity, id } = req.body;
  if (!quantity) return res.status(400).json({message: 'Write in a new quantity'})
db.run(
    `UPDATE ProductData set 
    quantity = COALESCE(?,quantity) 
    WHERE id = ?`,
    [quantity, id],
    function (err, result) {
      if (err) {
          console.log(err);
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: result,
      });
    })
};

export const deleteProduct = (req, res, next) => {
  db.run(
    "DELETE FROM ProductData WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted"});
    }
  );
};




// db.run(
//     `UPDATE UserData set 
//     refreshToken = COALESCE(?,refreshToken) 
//     WHERE email = ?`,
//     [refreshToken, email],
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         return res.json({ message: err });
//       }

//       // Creates Secure Cookie with refresh token
//       res.cookie("jwt", refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "None",
//         maxAge: 24 * 60 * 60 * 1000,
//       });