import express from "express";
const router = express.Router();
import { getEmployeesByDepartment } from "../Controllers/GetEmpDepartmentController.js";
router.get('/:department',getEmployeesByDepartment)
export default router;