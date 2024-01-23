const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
let team =[];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
async function promptManager() {
    console.log('Enter information for the Team Manager:');
    const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your Employee Id?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
      },
      {
        type: 'input',
        name: 'office',
        message: 'What is your office number?',
      },

  ])
  const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
 team.push(manager);

}

async function promptEngineer() {
    console.log('Enter information for the Engineer:');
    const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your Employee Id?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is your github?',
      },

  ])
  const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
 team.push(engineer);
await promptMenu();
}


async function promptIntern() {
    console.log('Enter information for the Intern:');
    const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your Employee Id?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
      },
      {
        type: 'input',
        name: 'school',
        message: 'What is your school?',
      },

  ])
  const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
  team.push(intern);
await promptMenu();
}


async function promptMenu() {
    const menuAnswers = await inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'What would you like to do next?',
      choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team'],
    });
    switch (menuAnswers.menu) {
        case 'Add an Engineer':
        await promptEngineer();
        break;
      case 'Add an Intern':
        await promptIntern();
        break;
      case 'Finish building the team':
        getHTML(team);
        console.log('HTML generated successfully. Team building complete!');
        break;
    }}

    async function init() {
        await promptManager();
        await promptMenu();
        
      }
      
       function getHTML(team){
        // render(team);
        fs.writeFile(outputPath,render(team));
      };

      init();