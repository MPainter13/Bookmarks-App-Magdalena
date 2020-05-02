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
 filterBookmark();
 render();
}
 
const render = function() {
  const items = store.bookmarks.map(bookmark =>{
    return `
    <li class="title">
    <h2>${bookmark.title}</h2> <div class="rating">${bookmark.rating}</div>
  </li>
    `;
  });

  let adding = '';
  if (store.adding == true) {
    adding = `
    <form class="addingItem>
    <label for="addNewBookmark">Add new Bookmark</label>
    <input type="text" id="addNewBookmark" name="title">
    <label for="addDescription">Description</label>
    <input type="text" id="description" name="description">
    <label for="link">Link:</label>
    <input type="url" id="link" name="link">
    <button>Submit</button>
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

const addBookmark = function() {
 $('main').on('click', '#addBookmark', e => {
   store.adding = true;
  render();
 });
}

const filterBookmark = function() {
 $('main').on('click', '#filterBy', e => {
  render();
 });
}

const expendItem = function() {

};

$(main);

