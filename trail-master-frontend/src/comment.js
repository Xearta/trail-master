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
        return `<li>
        ${this.name}<br/>
        ${this.content}<br/>
        Trail ID: ${this.trail_id}<br/>
        Created At: ${this.created_at}<br/>
        <button id="delete-comment" data-id="${this.id}">Delete</button></li>
        </li><br/>
        `
    }
}