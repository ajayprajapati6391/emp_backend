import express from "express";
import {logout} from '../Controllers/LogoutController.js'
const router = express.Router();
router.post("/", logout);
export default router;
