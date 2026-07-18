import express from "express";
import { loginAdmin } from "../Controllers/LoginController.js";
const router = express.Router();
router.post("/",loginAdmin);
export default router;
