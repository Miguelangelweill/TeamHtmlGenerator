// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor(name,id,email,office) {
        super(name, id, email);
        this.id=id,
        this.email=email,
        this.officeNumber = office
    }
    getName(){
        return this.name
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager"
    }
}


module.exports=Manager;