import bcrypt from "bcrypt";
import Admin from "../Models/RegisterModel.js";

const createAdmin = async (req, res) => {
  try {
    const body = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email: body.email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Replace plain password with hashed password
    body.password = hashedPassword;

    const admin = new Admin(body);
    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export { createAdmin };
