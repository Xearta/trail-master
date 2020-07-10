/*
**** Trail Class ****
*/
class Trail {
    static all = [];
    
    constructor(id, name, location, difficulty, completion_time, elevation_gain, image_url, comments) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.difficulty = difficulty;
        this.completion_time = completion_time;
        this.elevation_gain = elevation_gain;
        this.image_url = image_url;
        this.comments = comments;
        Trail.all.push(this);
    }


    render() {
        // Add Image
        return `
            <div class="card">
                <div class="inner">
                    <img src="${this.image_url}" alt="trail">
                    <div class="overlay">
                        <h4>${this.name}</h4>
                        <span class="location">${this.location}</span>
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