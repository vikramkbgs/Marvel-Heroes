var App = (function () {
  // fetching Heroes at home page
  const fetchheroes = (name) => {
    const xhr = new XMLHttpRequest();

    // response handling
    xhr.onload = function () {
      var responseJSON = JSON.parse(xhr.response);

      const items = responseJSON.data.results;
      const count = Object.keys(items).length;

      let html = "";
      html += "<div class='card-columns'>";
      if (count > 0) {
        items.forEach((item) => {
          html += `<div class="card my-2" style="width:19rem;break-inside: avoid;">
                    <img class="card-img-top" src="${
                      item.thumbnail.path + "." + item.thumbnail.extension
                    }" id="${
            item.name
          }" style="cursor:pointer;" alt="image of ${item.name}">
                    <div class="card-body">
                        <span class="d-flex" style="justify-content:space-between;"> <h5 class="card-title">${
                          item.name
                        }</h5>
            <h4><i id="${
              item.id
            }" class="fa-brands fa-gratipay" style="cursor:pointer;"></i></h4></span>
                    </div>
                </div>`;
        });
      }
      document.getElementById("hero-part").innerHTML = " ";
      document.getElementById("comics-part").innerHTML = "";
      document.getElementById("alt-message").innerHTML = "";
      document.getElementById("cards-group").innerHTML = html;
    };

    // error handling
    xhr.onerror = function () {
      document.getElementById("hero-part").innerHTML = "";
      document.getElementById("comics-part").innerHTML = "";
      document.getElementById("cards-group").innerHTML = "";
      document.getElementById("alt-message").innerHTML =
        '<h2 style="font-weight:bold;">An error has occured, check connection.</h2>';
    };

    //sending request
    xhr.open(
      "GET",
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
      true
    );
    xhr.send();
  };

  // searching and filtering heroes
  const heroes = () => {
    const xhr = new XMLHttpRequest();
    var name = document.getElementById("name").value;

    // response handling
    if (name.length > 0)
      xhr.onload = function () {
        var responseJSON = JSON.parse(xhr.response);
        console.log(responseJSON);
        const items = responseJSON.data.results;
        const count = Object.keys(items).length;

        let html = "";
        html += "<div class='card-columns'>";
        if (count > 0) {
          items.forEach((item) => {
            html += `
                <div class="card my-2" style="width:19rem;break-inside: avoid;">
                    <img class="card-img-top" src="${
                      item.thumbnail.path + "." + item.thumbnail.extension
                    }" id="${
              item.name
            }" style="cursor:pointer;" alt="image of ${item.name}">
                    <div class="card-body">
                        <span class="d-flex" style="justify-content:space-between;"> <h5 class="card-title">${
                          item.name
                        }</h5>
            <h4><i id="${
              item.id
            }" class="fa-brands fa-gratipay" style="cursor:pointer;"></i></h4></span>
                    </div>
                </div> `;
          });
          document.getElementById("hero-part").innerHTML = " ";
          document.getElementById("comics-part").innerHTML = "";
          document.getElementById("alt-message").innerHTML = "";
          document.getElementById("cards-group").innerHTML = html;
        } else {
          document.getElementById("hero-part").innerHTML = " ";
          document.getElementById("comics-part").innerHTML = "";
          document.getElementById("cards-group").innerHTML = "";
          document.getElementById("alt-message").innerHTML =
            '<h2><span style="font-weight:bold;">No results for... ' +
            name +
            "</span>" +
            ". Try different name.</h2>";
        }
      };

    // error handling
    xhr.onerror = function () {
      document.getElementById("alt-message").innerHTML =
        "<h2>An error has occured, check connection.</h2>";
    };

    //sending request
    xhr.open(
      "GET",
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
      true
    );
    xhr.send();
  };
  // setup localStorage
  if (localStorage.getItem("fav") == null) {
    localStorage.setItem("fav", JSON.stringify([]));
  } else {
    var arr = JSON.parse(localStorage.getItem("fav"));
  }

  // favourite heroes add
  function addFav(id) {
    if (!arr.includes(id) == true) {
      arr.push(id);
      localStorage.setItem("fav", JSON.stringify(arr));
      alert("Your hero added in favourites");
      console.log(arr);
    } else {
      alert("Your hero already added in favourites");
    }
  }

  // favourite action for fetch favourite heroes
  function favHeroes() {
    const xhr = new XMLHttpRequest();
    let html = "";

    if (arr.length > 0) {
      //handling response
      for (let i = 0; i < arr.length; i++) {
        var id = arr[i];
        xhr.onload = function () {
          var responseJSON = JSON.parse(xhr.response);
          const item = responseJSON.data.results[0];
          // console.log(responseJSON);
          // console.log(count);
          // console.log(name);
          html += "<div class='card-columns'>";
          html += `
      <div class="card my-2" style="width:19rem;break-inside: avoid;">
                    <img class="card-img-top" src="${
                      item.thumbnail.path + "." + item.thumbnail.extension
                    }" id="${
            item.name
          }" style="cursor:pointer;" alt="image of ${item.name}">
                    <div class="card-body">
                        <span class="d-flex" style="justify-content:space-between;"> <h5 class="card-title">${
                          item.name
                        }</h5>
            <h4><i id="${
              item.id
            }" class="fa-brands fa-gratipay" style="cursor:pointer;"></i></h4></span>
                    </div>
        </div>`;
        };
        //handling error

        //sending request
        xhr.open(
          "GET",
          `https://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
          false
        );
        xhr.send();
      }
    } else {
      html = `<h2><span style="font-weight:bold;">You've no Favourites...`;
      document.getElementById("hero-part").innerHTML = " ";
      document.getElementById("comics-part").innerHTML = "";
      document.getElementById("cards-group").innerHTML = "";
      document.getElementById("alt-message").innerHTML = "";
      document.getElementById("alt-message").innerHTML = html;
    }

    document.getElementById("hero-part").innerHTML = " ";
    document.getElementById("comics-part").innerHTML = "";
    document.getElementById("alt-message").innerHTML = "";
    document.getElementById("cards-group").innerHTML = "";
    document.getElementById("cards-group").innerHTML = html;
  }
  const clickEventHandler = (e) => {
    const target = e.target;
    console.log("target: ", target);

    if (target.className == "fa-brands fa-gratipay") {
      const taskId = parseInt(target.id);
      console.log("id:", taskId);
      addFav(taskId);
      return;
    }

    if (target.className == "fa-brands fa-gratipay x") {
      favHeroes();
      return;
    }
  };

  function startApp() {
    console.log("App runing...");
    console.log("localStorage: ", arr);

    document.addEventListener("click", clickEventHandler);
    document.getElementById("name").addEventListener("keyup", heroes);
    fetchheroes("Dea");
  }
  //   startApp();
  return {
    startApp: startApp,
    Author: "vikram kumar",
  };
})();
