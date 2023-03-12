import { generateId } from "../Utils/generateId.js";

export class Note {
  constructor(data) {
    this.id = generateId()
    this.color = data.color
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.title = data.title
    this.content = data.content
  }

   wordCount() {
    let words = this.content
    return words.split(" ").length
  }

  get NoteTemplate() {
    if(this.title) {
      return `
      <div class="card mt-5">
      <div class="card-title">
      <span class="h5 p-2">
        ${this.title}
        ${this.updatedAt.toLocaleDateString()}, ${this.updatedAt.toLocaleTimeString()}
        <span class="badge"></span>
        </span>
      
      </div>
      <div class="card-body">${this.content}</div>
      </div>
      `
    } else{
      return ''
    }
  }

  get noteListTemplate() {
    return `
      <li class="list-group-item d-flex justify-content-between align-items-start">
      <div onclick="app.notesController.setActiveNote('${this.id}')" class="ms-2 me-auto">
        <div class="fw-bold">
          <input onchange="app.notesController.setColor('${this.id}')" type="color" class="m-auto form-control form-control-color" id="GFG_Color" value="${this.color}">
          ${this.title}
        </div>
        <p>Created on ${this.createdAt.toLocaleDateString()}, ${this.createdAt.toLocaleTimeString()}</p>
        <p>Updated on ${this.updatedAt.toLocaleDateString()}, ${this.updatedAt.toLocaleTimeString()}</p>
        <p>Words: ${this.wordCount()}</p>
        <div class="col-2 mx-4">
        <button onclick="app.notesController.removeNote('${this.id}')" class="btn btn-danger">Delete</button>
      </div>
      </div>
    </li>
      `
  }

 get editNoteForm() {
  return `
  <h4>Take a Note</h4>
  <form onsubmit="app.notesController.editNote()">
              <input type="text" required class="form-control" id="note-title" name="title" minlength="3" maxlength="15"
                placeholder="Note Title" value="${this.title}">
              <textarea placeholder="write a note..." class="form-control" name="content" id="note-content" cols="30"
                rows="10" value="${this.content}">${this.content}</textarea>
              <div class="row">
                <div class="col-2 mx-4">
                  <button type="submit" class="btn btn-secondary">Save</button>
                </div>

            </form>
  `
 }

}