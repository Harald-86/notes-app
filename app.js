const chalk = require("chalk");
const getNotes = require("./notes.js");

const msg = getNotes();
console.log(chalk.blue(msg));

console.log(chalk.green.inverse.bold("Success!!"));

console.log(chalk.blue.bold.inverse("I`m blue"));
