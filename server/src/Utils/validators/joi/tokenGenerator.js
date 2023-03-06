import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        email: user.email,
        role: user.role,
        storeId: user.role === 'admin' ? user.storeId : 0,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        email: user.email,
        role: user.role,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "10h" }
  );
};
