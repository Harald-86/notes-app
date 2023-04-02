const fs = require("fs");
const chalk = require("chalk");
const { load } = require("npm");

const getNotes = function () {
  return "Your notes..";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  /* const duplicateNotes = notes.filter((note) => note.title === title); */
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title already taken!"));
  }
};

// --------------------------------------- \\

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("Not found"));
  }
};

//---------------------------------------------\\
// List notes \\

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("My Notes !"));
  notes.forEach((myNotes) => {
    console.log(chalk.green(myNotes.title, ": "), chalk.yellow(myNotes.body));
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.inverse.red("Note not found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
