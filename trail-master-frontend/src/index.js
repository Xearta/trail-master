const BASE_URL = 'http://localhost:3000';

window.addEventListener('load', () => {
    getTrails();
})

function getTrails() {
    clearForm();
    const main = document.querySelector('#main');
    main.innerHTML = "";
    fetch(BASE_URL+"/trails")
    .then(resp => resp.json())
    .then(trails => {
        main.innerHTML += trails.map(trail => `
            <li>
                <a href="#" data-id="${trail.id}">${trail.name}</a>
                - ${trail.location}
                - ${trail.difficulty}
                - ${trail.completion_time}
                - ${trail.elevation_gain}
                - <button id="update" data-id="${trail.id}">Edit</button>
                - <button id="delete" data-id="${trail.id}">Delete</button>
            </li>
        `).join('')

        attachClickToLinks();
    })
}

function clearForm() {
    const trailFormDiv = document.querySelector("#trail-form");
    trailFormDiv.innerHTML = "";
}

function attachClickToLinks() {
    let trails = document.querySelectorAll('#main li a');
    trails.forEach(trail => {
        trail.addEventListener('click', displayTrail);
    })

    document.querySelector("#trail-form-btn").addEventListener('click', displayCreateForm);
    document.querySelector("#all-trails-btn").addEventListener('click', getTrails);
    document.querySelectorAll('#update').forEach(trail => trail.addEventListener('click', editTrail))
    document.querySelectorAll("#delete").forEach(trail => trail.addEventListener('click',removeTrail))
}

function displayTrail() {
    clearForm();
    let id = event.target.dataset.id;
    const main = document.querySelector("#main");
    main.innerHTML = "";

    fetch(BASE_URL+'/trails/'+id)
    .then(resp => resp.json())
    .then(trail => {
        main.innerHTML += `
        <h2>${trail.name}</h2>
        <li>Location: ${trail.location}</li>
        <li>Difficulty: ${trail.difficulty}</li>
        <li>Time to Complete: ${trail.completion_time}</li>
        <li>Elevation Gain: ${trail.elevation_gain}</li>
          `
    })
}

function displayCreateForm() {
    const trailFormDiv = document.querySelector("#trail-form");
    let form = `
                <form>
                    <label>Trail Name:</label>
                    <input type="text" id="name">
                    <label>Location:</label>
                    <input type="text" id="location">
                    <label>Difficulty:</label>
                    <input type="text" id="difficulty">
                    <label>Time To Complete:</label>
                    <input type="text" id="completion_time">
                    <label>Elevation Gain:</label>
                    <input type="text" id="elevation_gain">
                    <input type="submit">
                </form>
                `
    trailFormDiv.innerHTML = form;
    document.querySelector('form').addEventListener('submit', createTrail);
}

function createTrail() {
    event.preventDefault();
    const trail = {
        name: document.querySelector('#name').value,
        location: document.querySelector('#location').value,
        difficulty: document.querySelector('#difficulty').value,
        completion_time: document.querySelector('#completion_time').value,
        elevation_gain: document.querySelector('#elevation_gain').value
    }

    fetch(BASE_URL+'/trails', {
        method: "POST",
        body: JSON.stringify(trail),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(trail => {
        document.querySelector('#main').innerHTML += `
                        <li>
                            <a href="#" data-id="${trail.id}">${trail.name}</a>
                            - ${trail.location}
                            - ${trail.difficulty}
                            - ${trail.completion_time}
                            - ${trail.elevation_gain}
                        </li>
                                            `
        getTrails();
    })
}

function editTrail() {
    let id = event.target.dataset.id;
    event.preventDefault();
    clearForm();

    fetch(BASE_URL+'/trails/'+id)
    .then(resp => resp.json())
    .then(trail => {
        const trailFormDiv = document.querySelector("#trail-form");
        let form = `
                    <form data-id="${id}">
                        <label>Trail Name:</label>
                        <input type="text" id="name" value="${trail.name}">
                        <label>Location:</label>
                        <input type="text" id="location" value="${trail.location}">
                        <label>Difficulty:</label>
                        <input type="text" id="difficulty" value="${trail.difficulty}">
                        <label>Time To Complete:</label>
                        <input type="text" id="completion_time" value="${trail.completion_time}">
                        <label>Elevation Gain:</label>
                        <input type="text" id="elevation_gain" value="${trail.elevation_gain}">
                        <input type="submit">
                    </form>
                    `
        trailFormDiv.innerHTML = form;
        document.querySelector('form').addEventListener('submit', updateTrail);
    })
}

function updateTrail() {
    event.preventDefault();
    let id = event.target.dataset.id;
    const trail = {
        name: document.querySelector('#name').value,
        location: document.querySelector('#location').value,
        difficulty: document.querySelector('#difficulty').value,
        completion_time: document.querySelector('#completion_time').value,
        elevation_gain: document.querySelector('#elevation_gain').value
    }

    fetch(BASE_URL+'/trails/'+id, {
        method: "PATCH",
        body: JSON.stringify(trail),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(trail => {
        document.querySelector(`li a[data-id='${id}']`).parentElement.innerHTML = `
                        <li>
                            <a href="#" data-id="${trail.id}">${trail.name}</a>
                            - ${trail.location}
                            - ${trail.difficulty}
                            - ${trail.completion_time}
                            - ${trail.elevation_gain}
                        </li>
                                            `
        getTrails();
    })
}


function removeTrail() {
    let id = event.target.dataset.id;
    event.preventDefault();
    clearForm();

    fetch(BASE_URL+"/trails/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}