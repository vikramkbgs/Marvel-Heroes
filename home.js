// iff function variable protection and security improvement
var AppMarvelList = (function () {
  let heroes = [];
  const heroesList = document.getElementById("list");
//   const addTaskInput = document.getElementById("add");
//   const tasksCounter = document.getElementById("tasks-counter");

  console.log("Working");

  // throught api data fetching
  async function fetchHeroes() {
    //get request
    // fetch('https://jsonplaceholder.typicode.com/todos') // promise return
    // .then(function(response){
    //     console.log(response);
    //     return response.json(); // promise return
    // }).then(function(data){
    //     // console.log(data);

    //     tasks = data.slice(0,15);
    //     renderList();
    // })
    // .catch(function(error){       // for error
    //     console.log('error', error);
    // })
    try {
      const response = await fetch(
        "http://gateway.marvel.com/v1/public/characters?limit=100&offset=188&ts=1&apikey=ceee23f7402d93c0edb2d82268aceb9b&hash=c0f33182e46f2aebbfa3c53a7ab039fd"
      );
      const data = await response.json();
    heroes = data.data.results;
    console.log(data);
    renderList();
    } catch (error) {
      console.log(error);
    }
  }

  function addHeroesToDOM(hero) {
    const div = document.createElement("div");
            div.className ="col";   //adding class into div variable

    // div.innerHTML = `
    //     <input type="checkbox" id="${task.id}" ${
    //   task.completed ? "checked" : ""
    // }  class = "custom-checkbox">
    //     <label for="${task.id}">${task.title}</label>
    //     <img src="bin.png" class="delete" data-id="${task.id}"/>
    // `;

    div.innerHTML = `  
    <div class="card shadow-sm">
        <img src="${
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

  function renderList() {
    heroesList.innerHTML = "";
    for (let i = 0; i < heroes.length; i++) {
      addHeroesToDOM(heroes[i]);
    }
  }

  function startApp() {
    fetchHeroes();
  }
  return {
    startApp: startApp,
    Author: "vikram kumar",
  };
})();
