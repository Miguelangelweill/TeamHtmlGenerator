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
  try {
    const requiredQuestion = [
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID?",
        name: "id",
      },
      {
        type: "input",
        message: "Pelease provide us with your email",
        name: "email",
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

    fs.readFile(outputPath, "utf8", function (err, data) {
      if (err) {
        begginingHtml();
      }
    });
    let myRole;
    let managerInfo;
    let engineerInfo;
    let internInfo;

    if (firstAnswer.role === "Manager") {
      myRole = await inquirer.prompt(managerQuestions);
      managerInfo = new Manager(
        firstAnswer.name,
        firstAnswer.id,
        firstAnswer.email,
        myRole.office
      );
      console.log(managerInfo);
      console.log(managerInfo.getRole());
      createMember(managerInfo);
    } else if (firstAnswer.role === "Engineer") {
      myRole = await inquirer.prompt(engineerQuestions);
      engineerInfo = new Engineer(
        firstAnswer.name,
        firstAnswer.id,
        firstAnswer.email,
        myRole.github
      );
      console.log(engineerInfo);
      console.log(engineerInfo.getRole());
      createMember(engineerInfo);
    } else if (firstAnswer.role === "Intern") {
      myRole = await inquirer.prompt(interQuestions);
      internInfo = new Intern(
        firstAnswer.name,
        firstAnswer.id,
        firstAnswer.email,
        myRole.school
      );
      console.log(internInfo);
      console.log(internInfo.getRole());
      createMember(internInfo);
    }
    //here i am pushing to the employee array
    myEmployeeArr.push(myRole);

    const addMember = await inquirer.prompt(addMemberQuestion);

    if (addMember.anotherColaborator) {
      allQuestions();
    } else {
      console.log("Your html has been created");
      finishHtml();
    }
  } catch (err) {
    return console.log(err);
  }
  //Here is where i write my html
  function begginingHtml() {
    try {
      const header = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
    <style>
        .card{
            margin: 3%;
            min-width: 300px;
            display: inline-block
        }
        #header{
            background-color: black;
            color:whitesmoke;
            height: 10vh;
            padding-top: 2vh;
        }
        body{
            background-image: url('https://images.unsplash.com/photo-1506718468845-7578aa47670b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');
            background-repeat: no-repeat;
            background-size: cover;
            
        }
    </style>
</head>

<body>
    <div  class="container-fluid">
        <div  class="row">
            <div id="header" class="col-12 mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
    `;
      fs.appendFile(outputPath, header, function (err) {
        if (err) {
          console.log("Eroor on the header: ", err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  function createMember(member) {
    return new Promise(function (resolve, reject) {
      const name = member.getName();
      const role = member.getRole();
      const id = member.getId();
      const email = member.getEmail();
      let cardInfo = "";
      if (role === "Manager") {
        const officeNumber = member.getOfficeNumber();
        cardInfo = `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${name}</h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${role}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
            <li class="list-group-item">Office number: ${officeNumber}</li>
        </ul>
    </div>
</div>
`;
        fs.appendFile(outputPath, cardInfo, function (err) {
          if (err) {
            return reject;
          } else {
            return resolve;
          }
        });
      } else if (role === "Engineer") {
        const github = member.getGithub();
        cardInfo = `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${name}</h2>
        <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${role}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
            <li class="list-group-item">Git hub account: ${github}</li>
        </ul>
    </div>
</div>
`;
        fs.appendFile(outputPath, cardInfo, function (err) {
          if (err) {
            return reject;
          } else {
            return resolve;
          }
        });
      } else if (role === "Intern") {
        const school = member.getSchool();
        cardInfo = `
        <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${name}</h2>
        <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${role}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
            <li class="list-group-item">School: ${school}</li>
        </ul>
    </div>
</div>
`;
        fs.appendFile(outputPath, cardInfo, function (err) {
          if (err) {
            return reject;
          } else {
            return resolve;
          }
        });
      }
    });
  }
  function finishHtml() {
    try {
      const footer = `
      </div>
    </body>
    </html>`;
      fs.appendFile(outputPath, footer, function (err) {
        if (err) {
          console.log("Eroor on the footer: ", err);
        } 
      });
    } catch (err) {
      console.log("Error", err);
    }
  }
};

allQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
render(myEmployeeArr);

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
module.exports = myEmployeeArr;
