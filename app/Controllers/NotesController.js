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
    _drawNoteCount()
}

function _drawNoteCount() {
    let template = `Notes: ${appState.notes.length}`
    setHTML("note-count", template)
}

function _drawActiveNote() {
    if (appState.activeNote) {
        setHTML("note-info", appState.activeNote.NoteTemplate)
    } else{
        setHTML("note-info", '')
    }
    _drawNoteForm()
}

function _drawNoteForm() {
    if (appState.activeNote && appState.activeNote.title) {
        setHTML("note-form", appState.activeNote.editNoteForm)
    } else{
        let template = `
        <h4>Take a Note</h4>
  <form onsubmit="app.notesController.addNote()">
              <input type="text" required class="form-control" id="note-title" name="title" minlength="3" maxlength="15"
                placeholder="Note Title">
              <textarea placeholder="write a note..." class="form-control" name="content" id="note-content" cols="30"
                rows="10"></textarea>
              <div class="row">
                <div class="col-2 mx-4">
                  <button type="submit" class="btn btn-secondary">Save</button>
                </div>

            </form>
        `
        setHTML("note-form", template)
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

    editNote() {
        window.event.preventDefault()
        let form = window.event.target
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

    clearActiveNote() {
        notesService.clearActiveNote()
    }

    showNotes() {
        _drawNotes()
        _drawActiveNote()
        _drawNoteForm()
    }

}