// import { ValuesController } from "./Controllers/ValuesController.js";
import { NotesController } from "./Controllers/NotesController.js";

class App {
  // valuesController = new ValuesController();
  notesController = new NotesController()
}

window["app"] = new App();
app.notesController.showNotes()