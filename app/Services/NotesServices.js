import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";

class NotesService {

    setActiveNote(noteId) {
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

    editNote(formData) {
        let foundNote = appState.notes.find((n) => n.id == appState.activeNote.id)
        foundNote.updatedAt = new Date().toDateString()
        foundNote.title = formData.title
        foundNote.content = formData.content

        appState.activeNote = foundNote
        saveState("activeNote",appState.activeNote)
        saveState("notes", appState.notes)
    }

    setColor(noteId, color) {
        let foundNote = appState.notes.find((n) => n.id == noteId)
        foundNote.color = color
        saveState("notes", appState.notes)
        if(appState.activeNote.id == noteId) {
            appState.activeNote.color = color
            saveState("activeNote", appState.activeNote)
        }
    }

    removeNote(noteId) {
        let filterNotes = appState.notes.filter((n) => n.id != noteId)
        appState.notes = filterNotes
        saveState("notes", appState.notes)
        if(appState.activeNote.id == noteId) {
            appState.activeNote = null
            saveState("activeNote", null)
        }
    }

}

export const notesService = new NotesService()