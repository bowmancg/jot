import { generateId } from "../Utils/generateId.js";

function formatDate(date) {
  // TODO google format dates in javascript

}

export class Note {
    constructor(data) {
        this.id = generateId()
        this.color = data.color
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.title = data.title
        this.content = data.content
    }


    get NoteTemplate() {
        return `

        `
    }

    get noteListTemplate() {
      return `
      <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">
          ${this.title}
        </div>
        ${this.createdAt} <br>
        ${this.updatedAt}

      </div>
    </li>
      `
    }

}