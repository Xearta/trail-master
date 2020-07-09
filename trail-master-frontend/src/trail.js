/*
**** Trail Class ****
*/
class Trail {
    static all = [];
    
    constructor(id, name, location, difficulty, completion_time, elevation_gain, comments) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.difficulty = difficulty;
        this.completion_time = completion_time;
        this.elevation_gain = elevation_gain;
        this.comments = comments;
        Trail.all.push(this);
    }

    render() {
        return `
        <li>
        <a href="#" data-id="${this.id}">${this.name}</a>
        - ${this.location}
        - ${this.difficulty}
        - ${this.completion_time}
        - ${this.elevation_gain}
        - <button id="update" data-id="${this.id}">Edit</button>
        - <button id="delete" data-id="${this.id}">Delete</button>
        `
    }

    static listTrails() {
        const main = document.querySelector("#main");
        main.innerHTML = "";

        
        Trail.all.forEach(trail => main.innerHTML += trail.render())
    }
}