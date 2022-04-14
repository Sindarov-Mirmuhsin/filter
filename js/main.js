const elList = document.querySelector(".list");
const elBookmarkList = document.querySelector(".bookmark-list");
const elModal = document.querySelector(".modal");

const localBookmark = JSON.parse(window.localStorage.getItem("bookmark"));

const bookmark = localBookmark || [];

renderBookmark(bookmark, elBookmarkList);

function renderBookmark(arr, element) {

  element.innerHTML = "";

  arr.forEach(e => {
    const newItem = document.createElement("li");
    const newDeleteBtn = document.createElement("button");

    newItem.textContent = e.title;
    newDeleteBtn.textContent = "Delete";

    newItem.classList.add("newItemTitle");
    newDeleteBtn.classList.add("delete-bookmark-btn");
    newDeleteBtn.type = "button";
    newDeleteBtn.dataset.filmId = e.id;
    newItem.appendChild(newDeleteBtn);
    element.appendChild(newItem);


  })
}

elBookmarkList.addEventListener("click", evt => {
  const isDeleteBtn = evt.target.matches(".delete-bookmark-btn");

  if (isDeleteBtn) {
    const deleteBtnId = evt.target.dataset.filmId;

    const findBookmarkFilmId = bookmark.findIndex(e => e.id == deleteBtnId);

    bookmark.splice(findBookmarkFilmId, 1);

    renderBookmark(bookmark, elBookmarkList);
    window.localStorage.setItem("list", JSON.stringify(bookmark));
  }
})

function renderGenres(arr, element) {

  var result = [];

  arr.forEach((film) => {

    film.genres.forEach(genre => {
      if (!result.includes(genre)) {
        result.push(genre)
      }
    })
  })

  result.forEach(genre => {
    const newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    element.appendChild(newOption);
  })

}

function renderFilms(arr, element) {
  element.innerHTML = "";

  arr.forEach(film => {
    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newHeading = document.createElement("h3");
    const newText = document.createElement("p");

    const newSubList = document.createElement("ul");
    const newBookmarkBtn = document.createElement("button");
    const newModalBtn = document.createElement("button");

    newHeading.textContent = film.title;
    newText.textContent = film.overview.split(" ").slice(0, 10).join(" ") + "...";



    for (var genre of film.genres) {
      const newSubItem = document.createElement("li");
      newSubList.classList.add("newSubList");
      newSubItem.classList.add("newSubItem");


      newSubItem.textContent = genre;
      newSubList.appendChild(newSubItem);
    }

    newItem.setAttribute("class", "list__item");
    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("class", "list__img");
    newHeading.setAttribute("class", "form__title")
    newText.setAttribute("class", "list__text");

    newModalBtn.classList.add("modal-btn");
    newModalBtn.textContent = ("More");
    newModalBtn.dataset.filmId = film.id;
    newBookmarkBtn.classList.add("bookmark-btn");
    newBookmarkBtn.textContent = "Bookmark";
    newBookmarkBtn.dataset.filmId = film.id;

    newItem.appendChild(newImg);
    // newItem.appendChild(newTime);
    newItem.appendChild(newHeading);
    newItem.appendChild(newText);
    // newItem.appendChild(newSubList);
    newItem.appendChild(newBookmarkBtn);
    newItem.appendChild(newModalBtn);
    element.appendChild(newItem);

  })

}



form.addEventListener("submit", evt => {
  evt.preventDefault();

  const selectVal = select.value.trim();

  let filterFilms = selectVal == "all" ? films : films.filter(element => element.genres.includes(selectVal));

  renderFilms(filterFilms, elList);

})

renderFilms(films, elList);
renderGenres(films, select);

const modalArray = [];
// const newTime = document.createElement("time");
// newTime.textContent = dateFormat(film.release_date);
// newTime.setAttribute("datetime", "2022-03-12");
// newTime.setAttribute("class", "form__time");

elList.addEventListener("click", evt => {
  const bookmarkBtn = evt.target.matches(".bookmark-btn");
  const modalBtn = evt.target.matches("modal-btn");


  if (bookmarkBtn) {
    const filmId = evt.target.dataset.filmId;
    const findFilm = films.find(e => e.id == filmId);
    const titleFilm = findFilm.title;

    if (!bookmark.includes(findFilm)) {
      bookmark.push(findFilm);
      renderBookmark(bookmark, elBookmarkList);
    }
  }
  

  
  if (evt.target.matches(".modal-btn")) {
    const filmId = evt.target.dataset.filmId;
    const findFilm = films.find(e => e.id == filmId);
    modalArray.push(findFilm);

    modalArray.forEach(evt => {
      modalTitle.textContent = evt.title;
      modalText.textContent = evt.overview;
    });
  }
})
