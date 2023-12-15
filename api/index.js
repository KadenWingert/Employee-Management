const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://kaden:kaden@cluster0.dujw8qk.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const Employee = require("./models/employee");
const Addendance = require("./models/attendance");
//endpoint to register an employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeID,
      desription,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      ativeEmployee,
      salary,
      address,
    } = req.body;

    //create a new employee
    const newEmployee = new Employee({
      employeeName,
      employeeID,
      desription,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      ativeEmployee,
      salary,
      address,
    });

    //save the employee
    await newEmployee.save();
    res.status(201).json({
      message: "Employee registered successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.log(error);
    res.setStatus(500).json({ message: "Failed to register an employee" });
  }
});

//endpoint to fetch all the employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});
