import db from "../../../database.js";
import {
  validateNewUser,
} from "../../Utils/validators/joi/userJoiSchema.js";


//Get all users fun
export const allUsers = (req, res, next) => {
  const sql = "select * from UserData";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
};

//Get specific user by id fun
export const userById = (req, res, next) => {
  const sql = "select * from UserData where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
};

//Patch a specific user
export const updateUser = (req, res, next) => {
  const { email, password, role, storeId } = req.body;
  console.log(email, "/..../", password, "/..../", role, "/..../", storeId);
  const data = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    storeId: req.body.storeId,
  };
  db.run(
    `UPDATE UserData set 
         email = COALESCE(?,email), 
         password = COALESCE(?,password),
         role = COALESCE(?,role),
         storeId = COALESCE(?,storeId)
         WHERE id = ?`,
    [data.email, data.password, data.role, data.storeId, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).send({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
};

//Delete a specific user
export const deleteUser = (req, res, next) => {
  db.run(
    "DELETE FROM UserData WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
};


export const test = async (req, res, next) => {
  const { error, value } = validateNewUser(req.body);
  if (error) {
    console.log(error);
    return res.send(error.details[0].message);
  }
  res.send({ value });
};
