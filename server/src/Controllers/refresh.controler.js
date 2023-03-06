import jwt from "jsonwebtoken";
import { generateAccessToken } from "../Utils/validators/joi/tokenGenerator.js";
import getAllUser from "../Utils/getAllUsersFun.js";

// Create refresh token
export const refreshToken = async (req, res) => {

//Refresh token send back from the client
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  const refreshToken = authHeader.split(" ")[1];
  const allUsers = await getAllUser();
  const existingUser = allUsers.find((user) => user.refreshToken === refreshToken);
  console.log(existingUser, "existingUser");

  if (!existingUser) {
    return res.status(403).json({meassage: "Refresh token is not valid!"});
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: err.message });
    }

    const newAccessToken = generateAccessToken(existingUser);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  });
};
