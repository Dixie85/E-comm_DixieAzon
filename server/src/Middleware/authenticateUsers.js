export const authAdmin = async (req, res, next) => {
  const role = req.role;

  // header send from getAllStores function
  if (req.header("getAllStores")) return next();
    
  if (role !== "admin" && role !== "super-admin") {
    return res.status(401).json({ message: "You are not authenticated Admin!" });
  } else {
    next();
  }
};

export const authSuper = async (req, res, next) => {
  const role = req.role;

  // header send from getAllStores function
  if (req.header("getAllStores")) return next();

  if (role !== "super-admin") {
    return res.status(401).json({ message: "You are not authenticated Super!" });
  } else {
    next();
  }
};
