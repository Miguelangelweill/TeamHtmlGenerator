const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let myEmployeeArr = [];
//These are all of my questions
const allQuestions = async () => {
  //These are the questions that are required for all of the members
  const requiredQuestion = [
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "Pelease provide us with your email",
      name: "email",
    },
    {
      type: "input",
      message: "What is your ID?",
      name: "id",
    },
    {
      type: "list",
      message: "What is your role in this project?",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ];

  //These are the questions required if you ara an inter
  const interQuestions = [
    {
      type: "input",
      message: "What school do you currently attend to?",
      name: "school",
    },
  ];
  //These are the questions for my engineer
  const engineerQuestions = [
    {
      type: "input",
      message: "What is your git hub username?",
      name: "github",
    },
  ];

  const managerQuestions = [
    {
      type: "input",
      message: "Please provide us with your office number",
      name: "office",
    },
  ];
  const addMemberQuestion = [
    {
      type: "confirm",
      message: "Would you like to add another team memeber?",
      name: "anotherColaborator",
    },
  ];

  const firstAnswer = await inquirer.prompt(requiredQuestion);

  let myRole;

  if (firstAnswer.role === "Manager") {
    myRole = await inquirer.prompt(managerQuestions);
  } else if (firstAnswer.role === "Engineer"){
    myRole = await inquirer.prompt(engineerQuestions)
  } else if (firstAnswer.role === "Intern") {
    myRole = await inquirer.prompt(interQuestions)
  }
  //here i am pushing to the employee array
  myEmployeeArr.push(firstAnswer,myRole)
  const addMember = await inquirer.prompt(addMemberQuestion);

  if (addMember.anotherColaborator){
    allQuestions()
  }else{
    console.log("Your html has been created")
  }
};

allQuestions()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
render(myEmployeeArr)
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
module.exports=myEmployeeArr;