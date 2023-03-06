import db from "../../database.js";
import bcrypt from "bcrypt";
import { validateLogInUser } from "../Utils/validators/joi/userJoiSchema.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Utils/validators/joi/tokenGenerator.js";
import getAllUser from "../Utils/getAllUsersFun.js";

//Login a user
export const userLogin = async (req, res, next) => {
  const { error, value } = validateLogInUser(req.body);
  if (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ message: "Incorrect or missing, email or password." });
  }
  const { email, password } = req.body;
  const allUsers = await getAllUser();

  //Check if email exists in the DB //if password is correct //create tokens, set in DB
  const existingUser = allUsers.find((user) => user.email === email);
  console.log(existingUser);
  if (!existingUser)
    return res.status(404).json({ message: "User not found. Sign up first." });
  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) {
    return res.status(404).json({ message: "Incorrect password" });
  } else {
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    db.run(
      `UPDATE UserData set 
      refreshToken = COALESCE(?,refreshToken) 
      WHERE email = ?`,
      [refreshToken, email],
      function (err, result) {
        if (err) {
          console.log(err);
          return res.json({ message: err });
        }

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });
        
        return res.status(200).json({
          accessToken,
          refreshToken,
        });
      }
    );
  }
};
