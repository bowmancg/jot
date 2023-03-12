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
    } else{
        setHTML("note-info", '')
    }

}

// function _drawNoteForm() {
//     if (appState.activeNote) {
//         setHTML("note-form", appState.activeNote.noteListTemplate)
//     }
// }


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

    editNote() {
        let form = document.getElementById('note-form')
        let formData = getFormData(form)
        notesService.editNote(formData)
    }

    setColor(noteId) {
        console.log(window.event.target.value);
        console.log(noteId);
        let color = window.event.target.value
        notesService.setColor(noteId, color)


        // 1. set color in active note
        // 2. find note in notes array matching note id
        // 3. set color in matching note in notes array
    }

    async removeNote(noteId) {
        if (await Pop.confirm("Are you sure?")) {
            notesService.removeNote(noteId)
        }
    }

    setActiveNote(noteId) {
        notesService.setActiveNote(noteId)
    }

    showNotes() {
        _drawNotes()
        _drawActiveNote()
    }

}