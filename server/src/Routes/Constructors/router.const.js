import {Router} from "express";
import root from "../../Controllers/root.controler.js";

const router = Router()

router.use(root)

export default router