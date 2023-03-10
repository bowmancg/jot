import { generateId } from "../Utils/generateId.js";

export class Note {
    constructor(data) {
        this.id = generateId()
        this.createdOn = new Date()
        this.updatedOn = new Date()
        this.title = data.title
        this.content = data.content
    }



    get NoteTemplate() {
        return `
        <form onsubmit="app.notesController.addNote()">
              <input type="text" required class="form-control" id="make-note" minlength="3" maxlength="15"
                placeholder="Note Title">
              <textarea placeholder="write a note..." class="form-control" name="note-content" id="content" cols="30" rows="10"></textarea>
              <div class="row">
                <div class="col-2">
                  <button type="submit" class="btn btn-danger">Delete</button>
                </div>
                <div class="col-2 mx-4">
                  <button type="reset" class="btn btn-secondary">Submit</button>
                </div>
            </form>
        `
    }

}