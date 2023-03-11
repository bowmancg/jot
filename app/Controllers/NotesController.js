import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesService } from "../Services/NotesServices.js";
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawNotes() {
    let template = ""
    appState.notes.forEach(note => (template += note.noteListTemplate))
    setHTML("note-list", template)
}

function _drawActiveNote() {
    if (appState.activeNote) {
        setHTML("note-info", appState.activeNote.NoteTemplate)
    }
}

export class NotesController {
    constructor() {
        console.log('construct');
        appState.on("notes", _drawNotes)
        appState.on("activeNote", _drawActiveNote)
    }

    addNote() {
        window.event.preventDefault()
        console.log('note add');
        let form = window.event.target
        let formData = getFormData(form)
        console.log(formData);
        notesService.addNote(formData)
    }


    showNotes() {
        _drawNotes()
    }

}