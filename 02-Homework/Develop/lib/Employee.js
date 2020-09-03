const allQuestions = require("allQuestions");
const myEmployeeArr = require("myEmployeeArr")
// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() { 
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}
//Here i am passing the argumnets to employee
const employee = new Employee ("miguel","id","miguelangl");

module.exports = Employee;