import express from "express";
import { createAdmin } from "../Controllers/RegisterController.js";
const router = express.Router();

router.post("/", createAdmin);

export default router;
