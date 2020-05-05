'use strict';

// const store = {
//   bookmarks: [
//     {
//       id: 'x56w',
//       title: 'Title 1',
//       rating: 3,
//       url: 'http://www.title1.com',
//       description: 'lorem ipsum dolor sit',
//       expanded: false
//     },
//     {
//       id: '6ffw',
//       title: 'Title 2',
//       rating: 5,
//       url: 'http://www.title2.com',
//       description: 'dolorum tempore deserunt',
//       expanded: false
//     }
//   ],
//   adding: false,
//   error: null,
//   filter: 0
// };

import store from './store.js';
import api from './api.js';


const generateMainMenu = function () {
  return `
    <button id="addBookmark">New +</button>
       <select id="filterBy"> 
        <option>Filter by</option>
        <option value = "5">Star 5</option> 
        <option value = "4">Star 4</option>
        <option value = "3">Star 3</option>
        <option value = "2">Star 2</option>
        <option value = "1">Star 1</option>
       </select>
    `;
};

const generateBookmarkElement = function (bookmark) {
  if (bookmark.expanded) {
    return `
          <li class="bookmark-item" data-id="${bookmark.id}">
          <h2>${bookmark.title}</h2> <div class="rating">${bookmark.rating}</div>
          <a href="${bookmark.url}" target="blank" class="button-link">Visit ${bookmark.title}!</a><span class="rating-${bookmark.rating}">   </span>
          <button type="button" class="button-delete">X</button> 
          <div class="description">                    
          <p>${bookmark.description}</p>
          </div>
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
};


const generateBookmarkString = function () {
  const bookmarks = store.bookmarks.map(item =>
    generateBookmarkElement(item));
  return bookmarks.join('');
};

const generateAddBookmark = function () {
  return `
    <form class="addingItem js-addingItem">
    <label for="addNewBookmark">Add new Bookmark</label>
    <input type="text" id="addNewBookmark" name="title" required>
    <label for="addDescription">Description</label>
    <input type="text" id="description" name="description" required>
    <label for="link">Link:</label>
    <input type="url" id="link" name="url" required>
    <label for="rating">Rating:</label>
    <input type="text" id="rating" name="rating" required>
    <button type="submit" class="submit">Submit</button>
    <button type="button" id="js-cancel">Cancel</button>
    </form>
    `;
};




const render = function () {
  let html = generateMainMenu();

  if (store.adding === false) {
    html += generateBookmarkString();
  }
  else {
    html += generateAddBookmark();
  }
  $('main').html(html);
};


const toAddNewPage = function () {
  $('main').on('click', '#addBookmark', event => {
    event.preventDefault();
    store.adding = true;
    render();
  });
};


const handleCancelButton = function () {
  $('main').on('click', '#js-cancel', event => {
    event.preventDefault();
    store.adding = false;
    render();
  });
};


const handleNewBookmarkSubmit = function () {
  $('main').on('submit', '.js-addingItem', event => {
    event.preventDefault();
    const title = $('#addNewBookmark').val();
    const url = $('#link').val();
    const description = $('#description').val();
    const rating = $('#rating').val();
    api.createBookmark(title, url, description, rating)
      .then((newItem) => {
        store.addBookmark(newItem);
        store.adding = false;
        render();
      });
  });
};

const handleExpendItem = function () {
  $('main').on('click', '.bookmark-item', event => {
    const id = $(event.target).data('id');
    const item = store.bookmarks.find(bookmark => bookmark.id === id);
    if (!item.expanded) {
      item.expanded = true;
    }
    else {
      item.expanded = false;
    }
    render();
  });
};

// const filterBookmark = function() {
//  $('main').on('click', '#filterBy', e => {
//   render();
//  });
// };



function bindEventListeners() {
  toAddNewPage();
  handleCancelButton();
  handleNewBookmarkSubmit();
  handleExpendItem();
}


export default {
  bindEventListeners,
  render
};

