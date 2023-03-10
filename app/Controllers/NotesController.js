import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesService } from "../Services/NotesServices.js";
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawNotes() {
    let template = ""
    appState.notes.forEach(note => (template += note.NoteTemplate))
    setHTML("listings", template)
}


export class NotesController {
    constructor() {
        console.log('construct');
        appState.on("listings", _drawNotes())
    }

    addNote() {
        if (window.event){
            window.event.preventDefault()
            let form = window.event.target
            let formData = getFormData(form)
            console.log(formData);
        }
    }

}