// iff function variable protection and security improvement
var AppMarvelList = (function () {
  let heroes = [];
  const heroesList = document.getElementById("list");
  const  character= document.getElementById("character");

  console.log("Working");

  // throught api, list of character fetching
  async function fetchHeroes() {
    try {
      const response = await fetch(
        "http://gateway.marvel.com/v1/public/characters?limit=100&offset=188&ts=1&apikey=ceee23f7402d93c0edb2d82268aceb9b&hash=c0f33182e46f2aebbfa3c53a7ab039fd"
      );
      const data = await response.json();
    heroes = data.data.results;
    // console.log(heroes);
    renderList();
    } catch (error) {
      console.log(error);
    }
  }

  // fetch individual character
  async function fetchCharacter(id) {
    try {
      const response = await fetch(
        "https://gateway.marvel.com:443/v1/public/characters/" +
          id +
          "?ts=1&apikey=ceee23f7402d93c0edb2d82268aceb9b&hash=c0f33182e46f2aebbfa3c53a7ab039fd"
      );
      const data = await response.json();
      console.log(data.data.results[0]);
      addCharacterToDOM(data.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  }

  function addHeroesToDOM(hero) {
    const div = document.createElement("div");
            div.className ="col";   //adding class into div variable

    div.innerHTML = `  
    <div class="card shadow-sm">
        <img class="image" id="${hero.id}" src="${
          hero.thumbnail.path + "." + "jpg"
        }" alt="Girl in a jacket" width="100%" height="160">
        <div class="card-body">
            <h6 class="card-text">${hero.name}</h6>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-book"></i> Comics:  ${
                      hero.comics.available
                    }</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">
                    <i class="fa-regular fa-star"></i></button>
                </div>
            </div>
        </div>
    </div>
    `;
    heroesList.append(div);
  }

  function addCharacterToDOM(hero){

    const div = document.createElement("div");

    div.innerHTML = `
     <section id="welcome-section" class="welcome-section">
      <h1>${hero.name}</h1>
      <img src="${hero.thumbnail.path + "." + "jpg"}" alt = "image not found">
      <p>${hero.description}</p>
    </section>
    `;
    heroesList.innerHTML ="";
    character.append(div);
  }

  function renderList() {
    heroesList.innerHTML = "";
    for (let i = 0; i < heroes.length; i++) {
      addHeroesToDOM(heroes[i]);
    }
  }

   function handleClickListener(e) {
     const target = parseInt(e.target.id);
     console.log(target);
     fetchCharacter(target);
   }

  function startApp() {
    document.addEventListener("click", handleClickListener);
    fetchHeroes();
  }
  return {
    startApp: startApp,
    Author: "vikram kumar",
  };
})();
