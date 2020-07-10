/*
**** Trail Class ****
*/
class Trail {
    static all = [];
    
    constructor(id, name, start_location, end_location, distance, difficulty, completion_time, elevation_gain, image_url, completed, comments) {
        this.id = id;
        this.name = name;
        this.start_location = start_location;
        this.end_location = end_location;
        this.distance = distance;
        this.difficulty = difficulty;
        this.completion_time = completion_time;
        this.elevation_gain = elevation_gain;
        this.image_url = image_url;
        this.completed = completed;
        this.comments = comments;
        Trail.all.push(this);
    }


    render() {
        if (this.completed) {
            this.test = "completed"            
        } else {
            this.test = "incomplete"
        }

        return `
            <div class="mix ${this.test} card" data-difficulty="${this.difficulty}" data-distance="${this.distance}" 
                                    data-elevation_gain="${this.elevation_gain}">
                <div class="inner">
                    <img src="${this.image_url}" alt="trail">
                    <div class="overlay">
                        <h4>${this.name}</h4>
                        <span class="location">${this.start_location}</span>
                        <span data-id="${this.id}" class="trail-button">Learn More</span>
                    </div>
                </div>
            </div>
        `
    }



    static listTrails() {
        const main = document.querySelector("#main");
        main.innerHTML = "";

        
        Trail.all.forEach(trail => main.innerHTML += trail.render())
    }
}