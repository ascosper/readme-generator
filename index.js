const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Readme complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the title of your project?',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter a title!');
              return false;
            }
          }
    },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'confirmLiscense',
        message: 'Would you like to enter a liscense',
        default: true
      },
      {
        type: 'input',
        name: 'Liscense',
        message: 'Provide some a liscense',
        when: ({ confirmLiscense }) => {
          if (confirmLiscense) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]);
  };
  const promptProject = readmeData => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Please enter a description of your project'
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Provide a information about how to use this project',
      },
      {
        type: 'input',
        name: 'contributiopm',
        message: 'Provide a the contribution guridlines for this project (Required)'
      },
      {
        type:'input',
        name:'test',
        message:'Provide a testing intructions for this project (Required)'
      },
      
    ])
    // .then(projectData => {
    //     readmeData.projects.push(projectData)
    //     .then(projectData => {
    //         readmeData.projects.push(projectData);
    //           return readmeData; 
    //       });
    //   });
  };
  
  
  promptUser()
  .then(promptProject)
  .then(readmeData => {
 const pageHTML = generatePage(readmeData);

fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Readme created! Check out index.html in this directory to see it!');
    });

  });