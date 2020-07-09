/*
***** Comment Class ****
*/
class Comment {
    constructor(id, name, content, trail_id, created_at) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.trail_id = trail_id;
        this.created_at = created_at;
    }

    render() {
        return `
        <li>
        <a href="#" data-id="${this.id}">${this.name}</a>
        - ${this.content}
        - ${this.trail_id}
        - ${this.created_at}
        - <button id="update" data-id="${this.id}">Edit</button>
        - <button id="delete" data-id="${this.id}">Delete</button>
        </li>
        `
    }
}