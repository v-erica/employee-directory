import express from "express";
import {
  getEmployees,
  getEmployeeById,
  getRandomEmployee,
} from "./db/employees.js";

const app = express();

export default app;

app.get("/", getMessage);
app.get("/employees", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
});
app.get("/employees/random", getRandomEmployeeRoute);
app.get("/employees/:id", getEmployeeByIdRoute);

function getMessage(req, res) {
  res.send(`Hello, Employees!`);
}

function getRandomEmployeeRoute(req, res) {
  const employee = getRandomEmployee();
  res.send(employee);
}

function getEmployeeByIdRoute(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const employee = getEmployeeById(id);

  if (employee === undefined) {
    return res.status(404).send(`There is no employee with that ID.`);
  }
  res.send(employee);
}
