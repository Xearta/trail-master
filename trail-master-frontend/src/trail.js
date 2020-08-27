/*
 **** Trail Class ****
 */
class Trail {
  static all = [];

  constructor(trail) {
    this.id = trail.id;
    this.name = trail.name;
    this.start_location = trail.start_location;
    this.end_location = trail.end_location;
    this.distance = trail.distance;
    this.difficulty = trail.difficulty;
    this.completion_time = trail.completion_time;
    this.elevation_gain = trail.elevation_gain;
    this.image_url = trail.image_url;
    this.completed = trail.completed;
    this.comments = trail.comments;
    Trail.all.push(this);
  }

  render() {
    return `
            <div class="mix ${this.completed ? 'completed' : 'incomplete'} card" data-difficulty="${this.difficulty}" 
            data-distance="${this.distance}" data-elevation_gain="${this.elevation_gain}">
                <div class="inner">
                    <img src="${this.image_url}" alt="trail">
                    <div class="overlay">
                        <h4>${this.name}</h4>
                        <span class="location">${this.start_location}</span>
                        <span data-id="${this.id}" class="trail-button">Learn More</span>
                    </div>
                </div>
            </div>
        `;
  }

  static listTrails() {
    Trail.all.forEach(trail => (main.innerHTML += trail.render()));
  }
}
