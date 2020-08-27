/*
 ***** Comment Class ****
 */
class Comment {
  constructor(comment) {
    this.id = comment.id;
    this.name = comment.name;
    this.content = comment.content;
    this.trail_id = comment.trail_id;
    this.created_at = comment.created_at;
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
