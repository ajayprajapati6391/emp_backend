import express from "express";
import {
  createEmployee,
  getAllEmployee,
  getAllEmployeeById,
  deleteAllEmployeeById,
  updateEmployeeById,
} from "../Controllers/EmployeeController.js";
import { cloudinaryFileUpload } from "../Middlewares/FileUploader.js";
const router = express.Router();

router.get("/", getAllEmployee);
router.get("/:id", getAllEmployeeById);
router.post("/", cloudinaryFileUpload.single("profileImage"), createEmployee);
router.put(
  "/:id",
  cloudinaryFileUpload.single("profileImage"),
  updateEmployeeById,
);
router.delete("/:id", deleteAllEmployeeById);
export default router;
