import EmployeeModel from "../Models/EmployeeModel.js";

// Add employess
const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file?.path : null;
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
// get All employees
const getAllEmployee = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", // case insensitive
        },
      };
    }

    const totalEmployee = await EmployeeModel.countDocuments(searchCriteria);

    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    const totalPage = Math.ceil(totalEmployee / limit);
    if (emps.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "All  Employees",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployee,
          totalPage,
          currentPage: page,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

//get employee by the id
const getAllEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findById(id);

    if (!emp) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(201).json({
      message: "Employee details",
      success: true,
      data: emp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

// update by id
const updateEmployeeById = async (req, res) => {
  try {
    const { name, email, phone, salary, department } = req.body;
    const { id } = req.params;
    let updateData = { name, email, phone, salary, department };
    if (req.file) updateData.profileImage = req.file.path;

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated",
      success: true,
      data: updateEmployee,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

// delete by id
const deleteAllEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findByIdAndDelete(id);
    if (!emp) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(201).json({
      message: "Employee deleted successfully",
      success: true,
      data: emp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export {
  createEmployee,
  getAllEmployee,
  getAllEmployeeById,
  deleteAllEmployeeById,
  updateEmployeeById,
};
