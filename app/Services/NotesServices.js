import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";

class NotesService {

    setActiveNotes(noteId) {
        let foundNote = appState.notes.find((n) => n.id == noteId)
        console.log(foundNote);
        appState.activeNote = foundNote
        saveState("activeNote", appState.activeNote)
    }

    addNote(formData) {
        let newNote = new Note(formData)
        appState.notes = [...appState.notes, newNote]
        saveState("notes", appState.notes)
    }

    removeNote(noteId) {
        let filterNotes = appState.notes.filter((n) => n.id != noteId)
        appState.notes = filterNotes
        saveState("notes", appState.notes)
    }

}

export const notesService = new NotesService()