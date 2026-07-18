import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./Config/db.js";
import EmployeeRoute from "./Routes/EmployeeRoute.js";
import RegisterRoute from "./Routes/RegisterRoute.js";
import LoginRoute from "./Routes/LoginRoute.js";
import Auth from "./Middlewares/Auth.js";

dotenv.config();
const app = express();
connectDB();

// Middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "https://emp-frontend-b8vf.vercel.app"],
    credentials: true,
     methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Employee Mgm server is running");
});

app.use("/api/admin", RegisterRoute);
app.use("/api/adminlogin", LoginRoute);
app.use("/api/employees", Auth, EmployeeRoute);
app.use("/api/logout", Auth, EmployeeRoute);
// Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;
