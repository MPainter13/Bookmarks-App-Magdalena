'use strict'

const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    }
  ],
  adding: false,
  error: null,
  filter: 0
};

const main = function() {
 addBookmark();
 handleNewItemSubmit();
 filterBookmark();
 handleCancelButton();
 expendItem();
 render();
}
 
const render = function() {
  const items = store.bookmarks.map(bookmark =>{
    if (bookmark.expanded) {
      return `
      <li class="bookmark-item" data-id="${bookmark.id}">
      <h2>${bookmark.title}</h2> <div class="rating">${bookmark.rating}</div>
      <p> ${bookmark.description}</p>
    </li>
      `; 
    }
    else {
      return `
    <li class="bookmark-item" data-id="${bookmark.id}">
    <h2>${bookmark.title}</h2> <div class="rating">${bookmark.rating}</div>
  </li>
    `;
    }
    
  });

  let adding = '';
  if (store.adding === true) {
    adding = `
    <form class="addingItem js-addingItem">
    <label for="addNewBookmark">Add new Bookmark</label>
    <input type="text" id="addNewBookmark" name="title" required>
    <label for="addDescription">Description</label>
    <input type="text" id="description" name="description">
    <label for="link">Link:</label>
    <input type="url" id="link" name="url" required>
    <label for="rating">Rating:</label>
    <input type="text" id="rating" name="rating">
    <button type="submit" class="submit">Submit</button>
    <button type="button" id="js-cancel">Cancel</button>
    </form>
    
    `;
  }

  const html = `
  <button id="addBookmark">Add</button>
  <select id="filterBy"> 
    <option>Filter by</option>
    <option>Star 1</option> 
    <option>Star 2</option>
    <option>Star 3</option>
    <option>Star 4</option>
    <option>Star 5</option>
  </select>
  ${adding}
  <ul>${items}</ul>
  `;
  $('main').html(html);
}



const expendItem = function() {
 $('main').on('click', '.bookmark-item', event => {
  const id = $(event.target).data('id')
  const item = store.bookmarks.find(bookmark => bookmark.id === id);
 if (!item.expanded) {
   item.expanded = true;
 }
 else {
   item.expanded = false;
 }
  render();
 })
};

const addBookmark = function() {
 $('main').on('click', '#addBookmark', e => {
   store.adding = true;
  render();
 });
};

const handleNewItemSubmit = function () {
  $('main').on('submit', '.js-addingItem', event => {
    event.preventDefault();
    const item = {
      title: event.target.title.value,
      rating: event.target.rating.value,
      url: event.target.url.value,
      description: event.target.description.value
    };
    store.bookmarks.push(item);
    render();
  });
};

const handleCancelButton = function () {
  $('main').on('click', '#js-cancel', event => {
    store.adding = false;
    render();
  })
}

const filterBookmark = function() {
 $('main').on('click', '#filterBy', e => {
  render();
 });
}


$(main);