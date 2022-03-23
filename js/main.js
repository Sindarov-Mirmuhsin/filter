var elList = document.querySelector(".list");

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
    var newItem = document.createElement("li");
    var newImg = document.createElement("img");
    var newHeading = document.createElement("h3");
    var newText = document.createElement("p");
    var newTime = document.createElement("time");
    var newSubList = document.createElement("ul");

    newHeading.textContent = film.title;
    newText.textContent = film.overview.split(" ").slice(0, 10).join(" ") + "...";
    newTime.textContent = dateFormat(film.release_date);

    for (var genre of film.genres) {
      var newSubItem = document.createElement("li");
      newSubItem.textContent = genre;
      newSubList.appendChild(newSubItem);
    }

    newItem.setAttribute("class", "list__item");
    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("class", "list__img");
    newHeading.setAttribute("class", "form__title")
    newText.setAttribute("class", "list__text");
    newTime.setAttribute("datetime", "2022-03-12");
    newTime.setAttribute("class", "form__time");

    newItem.appendChild(newImg);
    newItem.appendChild(newTime);
    newItem.appendChild(newHeading);
    newItem.appendChild(newText);
    newItem.appendChild(newSubList);
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

