import db from "../../../database.js";
import md5 from "md5";

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
  const sql = "select * from StoreData where id = ?";
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
}