import mongoose from "mongoose";
const empSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required:true
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["HR", "Admin", "Staff"],
      default: "Staff",
    },
  },
  { timestamps: true },
);

const EmployeesModel = mongoose.model("employees", empSchema);
export default EmployeesModel;
