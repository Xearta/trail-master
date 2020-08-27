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
        <span id="comment-name">${this.name} says: </span><br/>
        <span id="comment-content">${this.content}</span><br/>
        <span id="comment-date">${new Date(this.created_at).toDateString()}</span><br/>
        <button id="delete-comment" data-id="${this.id}">X</button></li>
        </li><br/>
        `;
  }
}
