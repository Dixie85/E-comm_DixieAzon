import db from "../../../database.js";
import getAllStores from "../../Utils/getAllStoresFun.js";
import {randomUUID} from 'crypto'

//get all stores
export const allStores = (req, res, next) => {
  const sql = "select * from StoreData";
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

//get specific store by id
export const storeById = (req, res, next) => {
  const sql = "select * from StoreData where uniqueStoreId = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
      if (err) {
        console.log(err, 'loging error from storebyID');
          res.status(400).json({"error":err.message});
          return;
      }
      res.json({
          "message":"success",
          "data":row
      })
  });
}

//get all products from specific store by id
export const storeProductsById = (req, res, next) => {
  const sql = "select * from ProductData where storeId = ?";
  const params = [req.params.id];
  console.log(params, 'params');
  db.all(sql, params, (err, rows) => {
      if (err) {
        console.log(err, 'loging error from storeProductsById');
          res.status(400).json({"error":err.message});
          return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
  });
}

//create a store
export const addNewStore = async (req, res, next) => {
  const { name, email } = req.body;
  const allStores = await getAllStores()
  const existingStoreName = allStores.find((store) => store.name.toLowerCase() === name.toLowerCase());
  console.log(existingStoreName);
  if (existingStoreName) {
    return res
      .status(409)
      .json({ message:`Store name ${name} already exists` });
  }
  const storeId = randomUUID();
  const sql =
  "INSERT INTO StoreData (name ,uniqueStoreId) VALUES (?,?)";
  const params = [name, storeId];
  db.run(sql, params, function (err, result) {
    console.log(result, 'result from ADD NEW STORE');
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    db.run(`UPDATE UserData set
     storeId = COALESCE(?,storeId) 
     WHERE email = ?`,
     [storeId, email])
    res.json({
      message: "success",
      // data: data,
      // id: this.lastID,
    });
  });
}

//delete a store 
export const deleteStore = (req, res, next) => {
  db.run(
    "DELETE FROM StoreData WHERE uniqueStoreId = ?",
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



