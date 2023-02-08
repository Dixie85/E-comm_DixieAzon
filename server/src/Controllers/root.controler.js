import {Router} from "express";

const root = Router()

// Root endpoint
root.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

export default root