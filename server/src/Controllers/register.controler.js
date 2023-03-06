import db from "../../database.js";
import bcrypt from "bcrypt";
import {
  validateNewUser,
} from "../Utils/validators/joi/userJoiSchema.js";
import getAllUser from "../Utils/getAllUsersFun.js";


//Create a new user
export const createNewUser = async (req, res, next) => {
  console.log(req.body, 'loging from createNewUser');
  const { error, value } = validateNewUser(req.body);
  if (error) {
    if (error.details[0].path[0] === "confirm_password") {
      return res.status(400).send({ message: "Password don't match" });
    }
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  const { email, password, role } = req.body;
  const allUsers = await getAllUser();
  const existingEmail = allUsers.find((user) => user.email === email);
  console.log(existingEmail);
  if (existingEmail)
    return res
      .status(409)
      .json({ message: `User with email: ${email} already exists` });
  const hashedPwd = await bcrypt.hash(password, 10);
  const data = {
    id: allUsers.length + 1,
    email,
    password: hashedPwd,
    role,
  };
  const sql =
    "INSERT INTO UserData (id ,email, password, role) VALUES (?,?,?,?)";
  const params = [data.id, data.email, data.password, data.role];
  const result = db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      // id: this.lastID,
    });
  });
};