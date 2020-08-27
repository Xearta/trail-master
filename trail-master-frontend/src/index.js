const BASE_URL = 'http://localhost:3000';

window.addEventListener('load', () => {
  getTrails();
});

/* * * * * * * * *
 * Get All Trails *
 * * * * * * * * */
const getTrails = () => {
  clearForm();
  addFilterButtons();
  const main = document.querySelector('#main');
  main.innerHTML = '';
  fetch(BASE_URL + '/trails')
    .then(resp => resp.json())
    .then(trails => {
      Trail.all = [];

      trails.map(trail => {
        let image_url = trail.image_url;
        let comments_array = [];

        if (trail.image_url === null || trail.image_url === '') image_url = 'images/stock_trail.jpeg';
        if (trail.comments.length > 0) trail.comments.forEach(comment => comments_array.push(new Comment(comment)));

        new Trail(trail, comments_array);
      });

      Trail.listTrails();
      attachClickToLinks();
      mixer.forceRefresh();
      mixer.forceRender();
    });
};

/*  * * * * * * * *
 * Clear All Forms *
 * * * * * * * * * */
const clearForm = () => {
  const trailFormDiv = document.querySelector('.modal');
  const filterDiv = document.querySelector('.filter-buttons');
  trailFormDiv.innerHTML = '';
  filterDiv.innerHTML = '';
};

/* * * * * * * * *
 * Attach  Clicks *
 * * * * * * * * */
const attachClickToLinks = () => {
  let trails = document.querySelectorAll('#main li a');
  trails.forEach(trail => trail.addEventListener('click', displayTrail));

  document.querySelector('#trail-form-btn').addEventListener('click', displayCreateForm);
  document.querySelector('#all-trails-btn').addEventListener('click', getTrails);
  document.querySelectorAll('.trail-button').forEach(trail => trail.addEventListener('click', displayTrail));
  document.querySelectorAll('#delete-comment').forEach(btn => btn.addEventListener('click', removeComment));
  document.querySelectorAll('#update').forEach(trail => trail.addEventListener('click', editTrail));
  document.querySelectorAll('#delete').forEach(trail => trail.addEventListener('click', removeTrail));
  document.querySelectorAll('#trail-complete').forEach(trail => trail.addEventListener('click', updateTrailCompletion));
};

/* * * * * * * * * *
 * Trail Show Page *
 * * * * * * * * * */
const displayTrail = () => {
  clearForm();
  const main = document.querySelector('#main');
  let id = event.target.dataset.id;
  const trail = Trail.all.find(trail => trail.id == id);

  main.innerHTML = `
    <div id="trail-view">
        <h2 data-id="${id}">${trail.name}</h2><br/>
        <button id="trail-complete" data-id="${trail.id}" class="${trail.completed ? 'completed' : ''}">${
    trail.completed ? 'Mark Incomplete' : 'Mark Complete'
  }</button>
        <button id="update" data-id="${trail.id}">Edit Trail</button>
        <button id="delete" data-id="${trail.id}">Delete Trail</button>
        <div id="trail-view-contents">
            <img src="${trail.image_url}">
            <ul>
                <li id="trail-details"><span id="label">Start Location:</span> ${trail.start_location}</li>
                <li id="trail-details"><span id="label">End Location:</span> ${trail.end_location}</li>
                <li id="trail-details"><span id="label">Distance:</span> ${trail.distance} miles</li>
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
    </div>`;

  const commentsUl = document.querySelector('#commentsContainer ul');
  trail.comments.forEach(comment => (commentsUl.innerHTML += comment.render()));

  displayCommentForm();
  attachClickToLinks();
};

/* * * * * * * * *  *
 * Create Trail Form *
 * * * * * * * * * * */
const displayCreateForm = () => {
  const trailFormDiv = document.querySelector('.modal');
  const modalBg = document.querySelector('.modal-bg');
  modalBg.classList.add('active');

  let form = `
                <h2>Create A New Trail</h2>
                <form>
                    <label>Trail Name:</label>
                    <input required type="text" id="name" placeholder="Appalachian Trail"><br/>
                    <label>Start Location:</label>
                    <input required type="text" id="start_location" placeholder="Maine, USA"><br/>
                    <label>End Location:</label>
                    <input required type="text" id="end_location" placeholder="Georgia, USA"><br/>
                    <label>Distance: [Miles]</label>
                    <input required type="number" id="distance" placeholder="2200"><br/>
                    <label>Difficulty: [1-5]</label>
                    <input required type="number" id="difficulty" placeholder="4"><br/>
                    <label>Time To Complete: [Hours]</label>
                    <input required type="number" id="completion_time" placeholder="2200"><br/>
                    <label>Elevation Gain: [Feet]</label>
                    <input required type="number" id="elevation_gain" placeholder="2345"><br/>
                    <label>Trail Image URL: [Optional]</label>
                    <input type="url" id="image_url"><br/>
                    <input type="submit">
                </form>
                <span class="modal-close">X</span>
                `;
  trailFormDiv.innerHTML = form;
  const modalClose = document.querySelector('.modal-close');
  document.querySelector('form').addEventListener('submit', createTrail);
  modalClose.addEventListener('click', () => modalBg.classList.remove('active'));
};

/* * * * * * * * * *  *
 * Trail Create Action *
 * * * * * * * * * * * */
const createTrail = () => {
  event.preventDefault();
  document.querySelector('.modal-bg').classList.remove('active');

  let id;
  let name = document.querySelector('#name').value;
  let start_location = document.querySelector('#start_location').value;
  let end_location = document.querySelector('#end_location').value;
  let distance = document.querySelector('#distance').value;
  let difficulty = document.querySelector('#difficulty').value;
  let completion_time = document.querySelector('#completion_time').value;
  let elevation_gain = document.querySelector('#elevation_gain').value;
  let image_url = document.querySelector('#image_url').value;

  if (image_url === null || image_url === '') image_url = 'images/stock_trail.jpeg';

  let trail = new Trail(
    id,
    name,
    start_location,
    end_location,
    distance,
    difficulty,
    completion_time,
    elevation_gain,
    image_url,
    (completed = 'false')
  );

  fetch(BASE_URL + '/trails/', {
    method: 'POST',
    body: JSON.stringify(trail),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(data => getTrails());
};

/* * * * * * * * * *
 * Trail Edit Form  *
 * * * * * * * * *  */
const editTrail = () => {
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
            <input required type="text" id="name" value="${trail.name}"><br/>
            <label>Start Location:</label>
            <input required type="text" id="start_location" value="${trail.start_location}"><br/>
            <label>End Location:</label>
            <input required type="text" id="end_location" value="${trail.end_location}"><br/>
            <label>Distance: [Miles]</label>
            <input required type="number" id="distance" value="${trail.distance}"><br/>
            <label>Difficulty: [1-5]</label>
            <input required type="number" id="difficulty" value="${trail.difficulty}"><br/>
            <label>Time To Complete: [Hours]</label>
            <input required type="number" id="completion_time" value="${trail.completion_time}"><br/>
            <label>Elevation Gain: [Feet]</label>
            <input required type="number" id="elevation_gain" value="${trail.elevation_gain}"><br/>
            <label>Trail Image URL</label>
            <input tye="url" id="image_url" value="${trail.image_url}"><br/>
            <input type="submit" value="Update Trail">
        </form>
        <span class="modal-close">X</span>
        `;

  trailFormDiv.innerHTML = form;
  document.querySelector('form').addEventListener('submit', updateTrail);
  const modalClose = document.querySelector('.modal-close');
  modalClose.addEventListener('click', () => modalBg.classList.remove('active'));
};

/* * * * * * * * * *  *
 * Trail Update Action *
 * * * * * * * * * * * */
const updateTrail = () => {
  event.preventDefault();
  let id = event.target.dataset.id;
  const trail = Trail.all.find(trail => trail.id == id);
  const modalBg = document.querySelector('.modal-bg');
  modalBg.classList.remove('active');

  trail.name = document.querySelector('#name').value;
  trail.start_location = document.querySelector('#start_location').value;
  trail.end_location = document.querySelector('#end_location').value;
  trail.distance = document.querySelector('#distance').value;
  trail.difficulty = document.querySelector('#difficulty').value;
  trail.completion_time = document.querySelector('#completion_time').value;
  trail.elevation_gain = document.querySelector('#elevation_gain').value;
  trail.image_url = document.querySelector('#image_url').value;

  if (image_url === null || image_url === '') image_url = 'images/stock_trail.jpeg';

  fetch(BASE_URL + '/trails/' + id, {
    method: 'PATCH',
    body: JSON.stringify(trail),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(data => getTrails());
};

/* * * * * * * * * * * * * * * * *
 * Trail Mark As Completed Action *
 * * * * * * * * * * * * * * * *  */
const updateTrailCompletion = () => {
  event.preventDefault();
  let id = event.target.dataset.id;
  const trail = Trail.all.find(trail => trail.id == id);
  let complete_btn = document.querySelector('#trail-complete');

  trail.completed = !trail.completed;

  fetch(BASE_URL + '/trails/' + id, {
    method: 'PATCH',
    body: JSON.stringify(trail),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(data => {
      trail.completed
        ? (complete_btn.firstChild.data = 'Mark Incomplete')
        : (complete_btn.firstChild.data = 'Mark Complete');
      trail.completed ? complete_btn.classList.add('completed') : complete_btn.classList.remove('completed');
    });
};

/* * * * * * * * * *  *
 * Trail Delete Action *
 * * * * * * * * * * * */
const removeTrail = () => {
  let id = event.target.dataset.id;
  event.preventDefault();
  clearForm();

  fetch(BASE_URL + '/trails/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(getTrails());
};

/* * * * * * * * *  *
 * Add Comments Form *
 * * * * * * * * * * */
const displayCommentForm = () => {
  const commentsFormDiv = document.querySelector('#new-comments-form');
  let form = `
            <form>
                <label>Name: </label>
                <input type="text" id="commenter-name"><br/>
                <label>Comment Text: </label>
                <textarea id="comment-text" rows="4" cols="50"></textarea><br/>
                <input type="submit" value="Add Comment">
            </form>            
            `;
  commentsFormDiv.innerHTML = form;
  document.querySelector('form').addEventListener('submit', createComment);
};

/* * * * * * * *  *
 * Create Comments *
 * * * * * * * * * */
const createComment = () => {
  event.preventDefault();
  let id;
  let name = document.querySelector('#commenter-name').value;
  let content = document.querySelector('#comment-text').value;
  let trail_id = document.querySelector('#main h2').dataset.id;
  let created_at = new Date();

  let comment = new Comment(id, name, content, trail_id, created_at);

  fetch(BASE_URL + '/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(newComment => {
      displayCommentForm();
      const commentsUl = document.querySelector('#commentsContainer ul');
      commentsUl.innerHTML += comment.render();
    });
};

/* * * * * * * * *
 * Delete Comment *
 * * * * * * * * */
const removeComment = () => {
  let id = event.target.dataset.id;
  event.preventDefault();
  clearForm();

  fetch(BASE_URL + '/comments/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(event.target.parentElement.remove());
};

/* * * * * * * * * *  *
 * Filter/Sort Buttons *
 * * * * * * * * * * * */
const addFilterButtons = () => {
  const filterDiv = document.querySelector('.filter-buttons');
  filterDiv.innerHTML = `
        <div class="sortSection">
            <select class="select-filter">
                <option value="difficulty">Difficulty</option>
                <option value="distance">Distance</option>
                <option value="elevation_gain">Elevation Gain</option>
            </select>

            <select class="type-filter">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <button type="button" id="filter-btn">Filter</button>
        </div>
        <div class="filterSearch">
            <input type="text" id="searchInput" placeholder="Search by name or location...">
        </div>

        <div class="filterSection">
            <ul>
                <li>All: <input type="radio" name="comp-check" id="all" data-filter="all" data-target="all" checked></li>
                <li>Completed: <input type="radio" name="comp-check" id="completed" data-filter=".completed"></li>
                <li>Incomplete: <input type="radio" name="comp-check" id="incomplete" data-filter=".incomplete"></li>
            </ul>
        </div>
    `;

  document.querySelector('#filter-btn').addEventListener('click', () => {
    const selectFilter = document.querySelector('.select-filter').value;
    const typeFilter = document.querySelector('.type-filter').value;

    mixer.sort(`${selectFilter}:${typeFilter}`);
  });

  // Filter Buttons - All, Completed, Incomplete  && Search Listener
  document.querySelector('#all').addEventListener('click', () => mixer.filter('all'));
  document.querySelector('#completed').addEventListener('click', () => mixer.filter('.completed'));
  document.querySelector('#incomplete').addEventListener('click', () => mixer.filter('.incomplete'));
  document.querySelector('#searchInput').addEventListener('keyup', filterSearch);
};

/* * * * * * * * * * *  *
 * -=> FILTER SEARCH <=- *
 * * * * * * * * * * *   */
const filterSearch = () => {
  let filterValue = document.querySelector('#searchInput').value.toUpperCase();
  let cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let name = card.querySelector('h4');
    let location = card.querySelector('.location');

    if (
      name.textContent.toUpperCase().indexOf(filterValue) > -1 ||
      location.textContent.toUpperCase().indexOf(filterValue) > -1
    ) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
};

/* * * * * * * * * * * *
 * -=> MIXER OBJECT <=- *
 * * * * * * * * * * *  */
let mixer = mixitup('.main', {
  load: {
    sort: 'random',
  },
  selectors: {
    target: '.card',
  },
  animation: {
    duration: 500,
  },
});
