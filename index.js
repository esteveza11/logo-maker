const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter text for the logo (up to 3 characters):',
    validate: (input) => input.length <= 3 || 'Text must be up to 3 characters.',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a color for the text (color keyword or hex code):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a color for the shape (color keyword or hex code):',
  },
];

function generateSVG({ text, textColor, shape, shapeColor }) {
  let chosenShape;

  switch (shape) {
    case 'Circle':
      chosenShape = new Circle();
      break;
    case 'Triangle':
      chosenShape = new Triangle();
      break;
    case 'Square':
      chosenShape = new Square();
      break;
  }

  chosenShape.setColor(shapeColor);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
  ${chosenShape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
  `;
}

function init() {
  inquirer.prompt(questions).then((answers) => {
    const svgContent = generateSVG(answers);
    fs.writeFileSync('./dist/logo.svg', svgContent);
    console.log('Generated logo.svg');
  });
}

init();
