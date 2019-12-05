var inquirer = require('inquirer');
var fs = require('fs');

var newTeam = [];

class Employee {
    constructor(name, id, title) {
        this.name = name;
        this.id = id;
        this.title = title;
    };
    getName(){
    console.log( `${this.name}` );
    }
    getId(){
    console.log( `${this.id}` );
    }
    getEmail(){
    console.log( `${this.name}@company.com` );
    }
    getRole(){
    console.log( `${this.title}` );
    }        
}

// var a = new Employee("Alex", 12, "Employee");
// console.log(a);
// a.getName();
// a.getRole();

class Manager extends Employee {

    constructor(name, id, title, officeNumber) {
        super(name, id, title);
        this.officeNumber = officeNumber;
    };
    
    getRole(){
    console.log( `Manager`);
    }
}

// var b = new Manager("Fill", 24, "Manager", 2628);
// console.log(b);
// b.getName();
// b.getRole();

class Engineer extends Employee {

    constructor(name, id, title, github) {
        super(name, id, title);
        this.github = github;
    };
    
    getRole(){
    console.log( `Engineer`);
    }

    getGithub(){
    console.log( `https://github.com/${this.github}` )
    }
}

// var c = new Engineer("Daniel", 48, "Engineer", "dceballos");
// console.log(c);
// c.getName();
// c.getRole();
// c.getGithub();

class Intern extends Employee {

    constructor(name, id, title, school) {
        super(name, id, title);
        this.school = school;
    };
    
    getRole(){
    console.log( `Intern`);
    }

    getSchool(){
    console.log( `This intern studied at ${this.school}` )
    }
}

// var d = new Intern("Paul", 86, "Intern", "UofT Bootcamp");
// console.log(d);
// d.getName();
// d.getRole();
// d.getSchool();

const baseQuestions = [
    {
        name: 'name',
        message: "What is this employees name?"
    },
    {
        name: 'id',
        message: "What is this employees ID?"
    },
    {
        type: 'list',
        name: 'title',
        message: "What is this employees title?",
        choices: ["Intern", "Engineer", "Manager"],
    },
    {
        when: answers => {
            return answers.title == "Intern"
        },
        name: 'school',
        message: "What school are you from?"     
    },
    {
        when: answers => {
            return answers.title == "Engineer"
        },
        name: 'github',
        message: "Enter GitHub Username"     
    },
    {
        when: answers => {
            return answers.title == "Manager"
        },
        name: 'officeNumber',
        message: "Enter Office Number"     
    },
    {
        type: 'list',
        name: 'addAnotherMember',
        message: "Add another member?",
        choices: ["Yes", "No"],
    }
];

function init (){
    inquirer
    .prompt(baseQuestions)
    .then(answers => {
        let newMember;
        if (answers.title == "Manager"){
            newMember = new Manager(answers.name, answers.id, answers.title, answers.officeNumber);
        }
        
        else if (answers.title == "Engineer"){
            newMember = new Engineer(answers.name, answers.id, answers.title, answers.github);
        }
        else if (answers.title == "Intern"){
            newMember = new Intern(answers.name, answers.id, answers.title, answers.school);
        }   

        newTeam.push(newMember);

        if ( answers.addAnotherMember == "Yes" ){
            init();
        }
        else if ( answers.addAnotherMember == "No" ){
            console.log(newTeam)
            createHTML();
            createTeamPage();
            return;
        }
    });
}

init();

function createTeamPage() {
    fs.writeFile('newfile.html', content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}

let htmlContent = "";

let content;

function createHTML (){
    for (i = 0; i< newTeam.length; i++){
        if (newTeam[i].title == "Intern"){
            let htmlSnippet = (`
            <div class="employeeCard">
                <p>Name: ${newTeam[i].name}</p>
                <p>ID: ${newTeam[i].id}</p>
                <p>Title: ${newTeam[i].title}</p>
                <p>School: ${newTeam[i].school}</p>
            </div>
            `)
            htmlContent += htmlSnippet;
        }
        else if(newTeam[i].title == "Engineer" ){
            let htmlSnippet = (`
            <div class="employeeCard">
                <p>Name: ${newTeam[i].name}</p>
                <p>ID: ${newTeam[i].id}</p>
                <p>Title: ${newTeam[i].title}</p>
                <p>GitHub: <a href="www.github.com/${newTeam[i].github}">GitHub Link</a></p>
            </div>
            `)
            htmlContent += htmlSnippet;

        }
        else if(newTeam[i].title == "Manager" ){
            let htmlSnippet = (`
            <div class="employeeCard">
                <p>Name: ${newTeam[i].name}</p>
                <p>ID: ${newTeam[i].id}</p>
                <p>Title: ${newTeam[i].title}</p>
                <p>Office #: ${newTeam[i].officeNumber}</p>
            </div>
            `)
            htmlContent += htmlSnippet;
        }
    }
    generateContent(htmlContent);
}

function generateContent (information){
        return content = (`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                }
                #content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;


                }
                .employeeCard {
                    border: 2px solid black;
                    margin: 10px;
                    padding: 5px;
                }
            </style>
        </head>
        <body>
            <div id="content">
            ${information}
            </div>
        </body>
        </html>
    `);
}