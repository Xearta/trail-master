const BASE_URL = 'http://localhost:3000';

window.addEventListener('load', () => {
    getTrails();
})


/* * * * * * * * *
* Get All Trails *
* * * * * * * * */
function getTrails() {
    clearForm();
    const main = document.querySelector('#main');
    main.innerHTML = "";
    fetch(BASE_URL+"/trails")
    .then(resp => resp.json())
    .then(trails => {
        Trail.all = [];

        trails.map(trail => {
            let id = trail.id;
            let name = trail.name;
            let location =  trail.location;
            let difficulty = trail.difficulty;
            let completion_time = trail.completion_time;
            let elevation_gain = trail.elevation_gain;
            let comments = trail.comments;
            let image_url = trail.image_url;
            
            
            if (trail.image_url === null) {
                image_url = "images/stock_trail.jpeg"
            }


            let comments_array = [];

            if (comments.length > 0) {     
                comments.forEach(comment => {
                    let comment_id = comment.id;
                    let comment_name = comment.name;
                    let comment_content = comment.content;
                    let trail_id = comment.trail_id;
                    let comment_created = comment.created_at;

                    comments_array.push(new Comment(comment_id, comment_name, comment_content, trail_id, comment_created));                
                })                 
            }

            new Trail(id, name, location, difficulty, completion_time, elevation_gain, image_url, comments_array);
        })

        Trail.listTrails();
        attachClickToLinks();
    })
}

/*  * * * * * * * *
* Clear All Forms *
* * * * * * * * * */
function clearForm() {
    const trailFormDiv = document.querySelector(".modal");
    trailFormDiv.innerHTML = "";
}


/* * * * * * * * *
* Attach  Clicks *
* * * * * * * * */
function attachClickToLinks() {
    let trails = document.querySelectorAll('#main li a');
    trails.forEach(trail => {
        trail.addEventListener('click', displayTrail);
    })

    document.querySelector("#trail-form-btn").addEventListener('click', displayCreateForm);
    document.querySelector("#all-trails-btn").addEventListener('click', getTrails);
    document.querySelectorAll('.trail-button').forEach(trail => trail.addEventListener('click', displayTrail)); 
}


/* * * * * * * * * *
* Trail Show Page  *
* * * * * * * * * */
function displayTrail() {
    clearForm();
    const main = document.querySelector("#main");
    main.innerHTML = "";
    let id = event.target.dataset.id;
    const trail = Trail.all.find(trail => trail.id == id);

    main.innerHTML += `
    <div id="trail-view">
        <h2 data-id="${id}">${trail.name}</h2><br/>
        <div id="trail-view-contents">
            <img src="${trail.image_url}">
            <ul>
                <li id="trail-details"><span id="label">Location:</span> ${trail.location}</li>
                <li id="trail-details"><span id="label">Difficulty:</span> ${trail.difficulty}/5</li>
                <li id="trail-details"><span id="label">Time to Complete:</span> ${trail.completion_time} hrs</li>
                <li id="trail-details"><span id="label">Elevation Gain: +</span>${trail.elevation_gain} ft</li>
                <br/>
                <h3>Comments:</h3>
                <div id="commentsContainer">
                    <ul>
                    <br/>
                    </ul>
                </div>
                <div id="new-comments-form">
                </div>
            </ul>
        </div>
        <button id="update" data-id="${trail.id}">Edit Trail</button>
        <button id="delete" data-id="${trail.id}">Delete Trail</button>
    </div>`
    const commentsUl = document.querySelector('#commentsContainer ul');
    trail.comments.forEach(comment => commentsUl.innerHTML += comment.render())
    
    document.querySelectorAll('#delete-comment').forEach(btn => btn.addEventListener('click', removeComment));
    document.querySelectorAll('#update').forEach(trail => trail.addEventListener('click', editTrail));
    document.querySelectorAll("#delete").forEach(trail => trail.addEventListener('click',removeTrail));   
    displayCommentForm();
}




/* * * * * * * * *  *
* Create Trail Form *
* * * * * * * * * * */
function displayCreateForm() {
    const trailFormDiv = document.querySelector('.modal');
    const modalBg = document.querySelector('.modal-bg');
    modalBg.classList.add('active');

    let form = `
                <h2>Create A New Trail</h2>
                <form>
                    <label>Trail Name:</label>
                    <input type="text" id="name"><br/>
                    <label>Location:</label>
                    <input type="text" id="location"><br/>
                    <label>Difficulty:</label>
                    <input type="text" id="difficulty"><br/>
                    <label>Time To Complete:</label>
                    <input type="text" id="completion_time"><br/>
                    <label>Elevation Gain:</label>
                    <input type="text" id="elevation_gain"><br/>
                    <input type="submit">
                </form>
                <span class="modal-close">X</span>
                `
    trailFormDiv.innerHTML = form;
    document.querySelector('form').addEventListener('submit', createTrail);
    const modalClose = document.querySelector('.modal-close');
    modalClose.addEventListener('click', function() {
        modalBg.classList.remove('active');
    });
}


/* * * * * * * * * *  * 
* Trail Create Action *
* * * * * * * * * * * */
function createTrail() {
    event.preventDefault();
    const modalBg = document.querySelector('.modal-bg');
    modalBg.classList.remove('active');
    let id;
    let name = document.querySelector('#name').value;
    let location =  document.querySelector('#location').value;
    let difficulty = document.querySelector('#difficulty').value;
    let completion_time = document.querySelector('#completion_time').value;
    let elevation_gain = document.querySelector('#elevation_gain').value;


    let trail = new Trail(id, name, location, difficulty, completion_time, elevation_gain);

    fetch(BASE_URL+'/trails/', {
        method: 'POST',
        body: JSON.stringify(trail),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(getTrails())
}


/* * * * * * * * * *
* Trail Edit Form  *
* * * * * * * * *  */
function editTrail() {
    let id = event.target.dataset.id;
    const trail = Trail.all.find(trail => trail.id == id);
    event.preventDefault();
    clearForm();

    const trailFormDiv = document.querySelector('.modal');
    const modalBg = document.querySelector('.modal-bg');
    modalBg.classList.add('active');
        let form = `
        <h2>Edit The Current Trail</h2>
        <form data-id="${id}">
            <label>Trail Name:</label>
            <input type="text" id="name" value="${trail.name}"><br/>
            <label>Location:</label>
            <input type="text" id="location" value="${trail.location}"><br/>
            <label>Difficulty:</label>
            <input type="text" id="difficulty" value="${trail.difficulty}"><br/>
            <label>Time To Complete:</label>
            <input type="text" id="completion_time" value="${trail.completion_time}"><br/>
            <label>Elevation Gain:</label>
            <input type="text" id="elevation_gain" value="${trail.elevation_gain}"><br/>
            <input type="submit">
        </form>
        <span class="modal-close">X</span>
        `
        trailFormDiv.innerHTML = form;
        document.querySelector('form').addEventListener('submit', updateTrail);
        const modalClose = document.querySelector('.modal-close');
        modalClose.addEventListener('click', function() {
            modalBg.classList.remove('active');
        });
}


/* * * * * * * * *  * 
* Trail Edit Action *
* * * * * * * * * * */
function updateTrail() {
    event.preventDefault();
    let id = event.target.dataset.id;
    const modalBg = document.querySelector('.modal-bg');
    modalBg.classList.remove('active');

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
    .then(getTrails());

}

/* * * * * * * * * *  * 
* Trail Delete Action *
* * * * * * * * * * * */
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
    .then(getTrails());
}



/* * * * * * * * *  *
* Add Comments Form *
* * * * * * * * * * */
function displayCommentForm() {
    const commentsFormDiv = document.querySelector("#new-comments-form");
    let form = `
            <form>
                <label>Name: </label>
                <input type="text" id="commenter-name"><br/>
                <label>Comment Text: </label>
                <textarea id="comment-text" rows="4" cols="50"></textarea><br/>
                <input type="submit" value="Add Comment">
            </form>            
            `
    commentsFormDiv.innerHTML = form;
    document.querySelector('form').addEventListener('submit', createComment);
}


/* * * * * * * *  *
* Create Comments *
* * * * * * * * * */
function createComment() {
    event.preventDefault();
    let id;
    let name = document.querySelector('#commenter-name').value;
    let content = document.querySelector('#comment-text').value;
    let trail_id = document.querySelector('#main h2').dataset.id;
    let created_at = new Date();

    let comment = new Comment(id, name, content, trail_id, created_at);

    fetch(BASE_URL+'/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(newComment => {
        displayCommentForm();
        const commentsUl = document.querySelector('#commentsContainer ul');
        commentsUl.innerHTML += comment.render();
    })    
}



/* * * * * * * * *
* Delete Comment *
* * * * * * * * */
function removeComment() {
    let id = event.target.dataset.id;
    event.preventDefault();
    clearForm();

    fetch(BASE_URL+'/comments/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}



/* * * * * * * * *  *
* NavBar Stickyness *
* * * * * * * * * * */
window.onscroll = function() {
    const docScrollTop = document.documentElement.scrollTop;

    if (window.innerWidth>800) {
        if (docScrollTop>40) {
            document.querySelector('header').classList.add("fixed");
        } else {
            document.querySelector('header').classList.remove("fixed");
        }
    }
}