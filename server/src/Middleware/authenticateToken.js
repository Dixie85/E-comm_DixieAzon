import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {

  // header send from getAllUser function
  if (req.header("getAllUser")) return next();
  console.log(req.headers, 'loging the headers');

  // header send from getAllStores function
  if (req.header("getAllStores")) return next();

  // console.log('in the authToken');
  
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  console.log('still in authToken');
  // Authenticate token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: err.message });
    req.user = decoded.UserInfo.email;
    req.role = decoded.UserInfo.role;
    next();
  });
  console.log('for crying out loud!!!');
};

export const authRefreshToken = async (req, res, next) => {

  // header send from getAllUser function
  if (req.header("getAllUser")) return next();

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  // Authenticate token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: err.message });
    req.user = decoded.UserInfo.email;
    req.role = decoded.UserInfo.role;
    next();
  });
};
