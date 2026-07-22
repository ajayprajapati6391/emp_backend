// Get employees by department
import EmployeeModel from "../Models/EmployeeModel.js";
const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    console.log("Department Param:", department);
    // let { page, limit } = req.query;
    const employees = await EmployeeModel.find({ department: department });
    res.send(employees);
    // page = parseInt(page) || 1;
    // limit = parseInt(limit) || 5;

    // const skip = (page - 1) * limit;

    // const searchCriteria = {
    //   department: {
    //     $regex: `^${department}$`,
    //     $options: "i",
    //   },
    // };

    // const totalEmployee = await EmployeeModel.countDocuments(searchCriteria);

    // const employees = await EmployeeModel.find(searchCriteria)
    //   .skip(skip)
    //   .limit(limit)
    //   .sort({ updatedAt: -1 });

    // const totalPage = Math.ceil(totalEmployee / limit);

    // res.status(200).json({
    //   success: true,
    //   message: "Department employees fetched successfully",
    //   data: {
    //     employees,
    //     pagination: {
    //       totalEmployee,
    //       totalPage,
    //       currentPage: page,
    //       pageSize: limit,
    //     },
    //   },
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getEmployeesByDepartment };
