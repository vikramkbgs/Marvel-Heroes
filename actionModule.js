var App = (function(){
  const fetchheroes = async (name) => {
    //clear
    document.getElementById("hero-part-spinner").textContent = "";
    document.getElementById("comics-part-spinner").textContent = "";
    document.getElementById("hero-part").textContent = "";
    document.getElementById("comics-part").textContent = "";
    document.getElementById("alt-message").textContent = "";

    // show loading spinner
    document.querySelector(".loading").style.display = "block";
    try {
      // check if data is already in local storage
      let heroes = localStorage.getItem(name);
      if (heroes) {
        heroes = JSON.parse(heroes);
      } else {
        // make API call
        const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&limit=60&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        heroes = responseJSON.data.results;
        localStorage.setItem(name, JSON.stringify(heroes));
      }
      // create HTML string
      const count = heroes.length;
      if (count > 0) {
        let html = "<div class='card-columns'>";
        html += heroes
          .map(
            (item) => `
            <div class="card my-2" style="width:19rem;break-inside: avoid;">
              <img class="card-img-top" src="${
                item.thumbnail.path + "." + item.thumbnail.extension
              }" id="${item.name}" style="cursor:pointer;" alt="image of ${
              item.name
            }">
              <div class="card-body">
                <span class="d-flex" style="justify-content:space-between;">
<h5 class="card-title" id="${item.name}">${item.name}</h5>
<h4><i id="${
              item.id
            }" class="fa-brands fa-gratipay" style="cursor:pointer;"></i></h4>
</span>
</div>
</div>
`
          )
          .join("");
        html += "</div>";
        // update the DOM
        document.getElementById("cards-group").innerHTML = html;
        // hide loading spinner
        document.querySelector(".loading").style.display = "none";
      }
    } catch (error) {
      // handle error
      document.getElementById("alt-message").innerHTML =
        '<h2 style="font-weight:bold; class="text-success">An error has occurred, check connection.</h2>';
      // hide loading spinner
      document.querySelector(".loading").style.display = "none";
    }
  };


  const heroes = () => {
    // cache DOM elements
    const heroPart = document.getElementById("hero-part");
    const comicsPart = document.getElementById("comics-part");
    const altMessage = document.getElementById("alt-message");
    const cardsGroup = document.getElementById("cards-group");
    const nameInput = document.getElementById("name");
    const heroSpinner = document.getElementById("hero-part-spinner");
    const comicsSpinner = document.getElementById("comics-part-spinner");
    comicsSpinner.innerHTML = "";
    heroSpinner.innerHTML = "";
    heroPart.innerHTML = " ";
    comicsPart.innerHTML = "";
    altMessage.innerHTML = "";
    cardsGroup.innerHTML = "";
    // show loading spinner
    document.querySelector(".loading").style.display = "block";

    const name = nameInput.value;
    // response handling
    if (name.length > 0) {
      //sending request
      fetch(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&limit=40&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`
      )
        .then((response) => response.json())
        .then((responseJSON) => {
          const items = responseJSON.data.results;
          const count = items.length;
          if (count > 0) {
            // create HTML string
            const html = `<div class='card-columns'> ${items
              .map(
                (item) =>
                  `<div class="card my-2" style="width:19rem;break-inside: avoid;">
                <img class="card-img-top" src="${
                  item.thumbnail.path + "." + item.thumbnail.extension
                }" id="${item.name}" style="cursor:pointer;" alt="image of ${
                    item.name
                  }">
                <div class="card-body">
                  <span class="d-flex" style="justify-content:space-between;"> 
                    <h5 class="card-title" id="${item.name}">${item.name}</h5>
                    <h4><i id="${
                      item.id
                    }" class="fa-brands fa-gratipay" style="cursor:pointer;"></i></h4>
                  </span>
                </div>
              </div>`
              )
              .join("")}</div>`;

            // hide loading spinner
            document.querySelector(".loading").style.display = "none";
            // set HTML
            cardsGroup.innerHTML = html;
          } else {
            // hide loading spinner
            document.querySelector(".loading").style.display = "none";
            altMessage.innerHTML = `<h2 class="text-success"><span style="font-weight:bold;" class="text-success">No results for... ${name}</span> try different name.</h2>`;
          }
        })
        .catch((error) => {
          // hide loading spinner
          document.querySelector(".loading").style.display = "none";
          altMessage.innerHTML = `<h2 style="font--weight:bold; class="text-success"">An error has occurred, check connection.</h2>`;
        });
    }else{
      fetchheroes("I");
    }
  };

  /* This code retrieves the value of the "fav" key from local storage, 
  and parse it as an array using JSON.parse, if the value is null it assigns an empty array to arr. */
  var arr = JSON.parse(localStorage.getItem("fav")) || [];
  localStorage.setItem("fav", JSON.stringify(arr));

const addFav =(id) => {
    const favs = new Set(JSON.parse(localStorage.getItem("fav")));
    if (!favs.has(id)) {
      favs.add(id);
      localStorage.setItem("fav", JSON.stringify(Array.from(favs)));
      alert("Your hero added in favourites");
    } else {
      alert("Your hero already added in favourites");
    }
  }

const removeFav = (id) => {
  const favs = new Set(JSON.parse(localStorage.getItem("fav")));
  // console.log("favs:",favs);
  if (favs.has(id)) {
    favs.delete(id);
    localStorage.setItem("fav", JSON.stringify(Array.from(favs)));
    alert("Your hero removed from favourites");
  } else {
    alert("Your hero not present in favourites");
  }
};


const favHeroes = async () => {

  arr = JSON.parse(localStorage.getItem("fav")) || [];
  localStorage.setItem("fav", JSON.stringify(arr));

  //clear
  document.getElementById("hero-part-spinner").textContent = "";
  document.getElementById("comics-part-spinner").textContent = "";
  document.getElementById("hero-part").innerHTML = " ";
  document.getElementById("comics-part").innerHTML = "";
  document.getElementById("alt-message").innerHTML = "";
  document.getElementById("cards-group").innerHTML = "";

  // show loading spinner
  document.querySelector(".loading").style.display = "block";

  let html = `<h3 class="text-success">Favourites...</h3><hr/>`+"<div class='card-columns'>";
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      var id = arr[i];
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`
        );
        const data = await response.json();
        const item = data.data.results[0];
        html += `
      <div class="card my-2" style="width:19rem;break-inside: avoid;">
                    <img class="card-img-top" src="${
                      item.thumbnail.path + "." + item.thumbnail.extension
                    }" id="${
          item.name
        }" style="cursor:pointer;" alt="image of ${item.name}">
                    <div class="card-body">
                        <span class="d-flex" style="justify-content:space-between;"> <h5 class="card-title" id="${
                          item.name
                        }">${item.name}</h5>
            <h4 id="del-fav"><i id="${
              item.id
            }" class="fa-solid fa-heart-circle-xmark" style="cursor:pointer;"></i></h4></span>
                    </div>
                    
        </div>`;
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    html = `<h2><span style="font-weight:bold;" class="text-success">You've no Favourites...</span><h2>`;
  }
  // hide loading spinner
  document.querySelector(".loading").style.display = "none";
  document.getElementById("cards-group").innerHTML = html;
}
const heroDetails = () => {
  console.log("heroDetails");
  const name = document.getElementById("name").value;
  name && name !== "" ? connection(name) : fetchheroes("I");
};

const connection= (name)=> {
  document.getElementById("hero-part-spinner").innerHTML = " ";
  document.getElementById("comics-part-spinner").innerHTML = " ";
  document.getElementById("hero-part").innerHTML = " ";
  document.getElementById("comics-part").innerHTML = "";
  document.getElementById("alt-message").innerHTML = "";
  document.getElementById("cards-group").innerHTML = "";

  const xhr = new XMLHttpRequest();
  const params = "name=" + name;

  //  console.log(name);

  // during loading
  xhr.onloadstart = function () {
    document.getElementById("hero-part-spinner").innerHTML =
      '<strong id="spinnerText" class="text-primary">Loading character...</strong>' +
      '<div class="text-primary spinner-border ml-auto" role="status" ' +
      'aria-hidden="true" id="spinner"></div>';
  };
  // handle error
  xhr.onerror = function () {
    document.getElementById("alt-message").innerHTML =
      '<h2 id="characterMainTitle" class="text-success">An error has occured, check connection.</h2>';
  };

  // handle response
  xhr.onload = function () {
    var responseJSON = JSON.parse(xhr.response);
    if (responseJSON.data.count === 0) {
      document.getElementById("hero-part").innerHTML =
        `<h2 id="characterMainTitle" class="text-success">No results for... 
        ${name} 
        . Try again.</h2>`;

      document.getElementById("hero-part-spinner").innerHTML = "";
    }
    else if (responseJSON == undefined || responseJSON.length == 0) {
      document.getElementById("hero-part").innerHTML =
        '<h2 id="characterMainTitle" class="text-success">' +
        "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";

      document.getElementById("hero-part-spinner").innerHTML = "";
     
    }
    else {
      const characterAttributes = responseJSON.data.results[0],
        characterID = responseJSON.data.results[0].id;
      // character details
      let output = "";
      output =
        output +
        "<hr/>" +
        '<div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard">' +
        '<div id="characterImage">' +
        '<img class="card-img-right flex-auto d-md-block img-fluid"' +
        ' alt="Picture of ' +
        characterAttributes.name +
        '" src="' +
        characterAttributes.thumbnail["path"] +
        "." +
        characterAttributes.thumbnail["extension"] +
        '">' +
        "</div>" +
        '<div class="card-body d-flex flex-column align-items-start">' +
        '<h3 class="mb-0 text-dark" id="characterName">' +
        characterAttributes.name +
        "</h3>" +
        '<p class="card-text mb-3" id="characterDescription">';
      if (characterAttributes.description !== "") {
        output += characterAttributes.description;
      }
      output +=
        "</p>" +
        '<p class="text-muted mb-3" id="comicsAvailable">' +
        "Comics: " +
        characterAttributes.comics.available +
        " | " +
        "Series: " +
        characterAttributes.series.available +
        " | " +
        "Stories: " +
        characterAttributes.stories.available +
        " | " +
        "Events: " +
        characterAttributes.events.available +
        "</p>" +
        '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
        responseJSON["attributionText"] +
        "</p>" +
        "</div>" +
        "</div>";
      document.getElementById("hero-part").innerHTML = output;
      comics(characterID);
    }
  };

  // load at end
  xhr.onloadend = function () {
    document.getElementById("hero-part-spinner").innerHTML =
      '<h3 class="text-success"><strong id="spinnerText">Results...</strong></h3>';
  };

  xhr.open(
    "GET",
    `https://gateway.marvel.com/v1/public/characters?${params}&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
    true
  );

  xhr.send();
}
const comics = (characterID)=>{
    const xhr = new XMLHttpRequest();
    var id = characterID;

    //during loading
    xhr.onloadstart = function () {
      document.getElementById("comics-part-spinner").innerHTML =
        '<strong id="spinnerText" class="text-danger">Loading comics below...</strong>' +
        '<div class="spinner-border text-danger ml-auto" role="status" ' +
        'aria-hidden="true" id="spinner"></div>';
    };
    //handle error
    xhr.onerror = function () {
      document.getElementById("hero-part").innerHTML =
        '<h2 id="characterMainTitle" class="text-success">An error has occured, check connection.</h2>';
      document.getElementById("comics-part").innerHTML =
        '<h2 id="characterMainTitle" class="text-success">An error has occured, check connection.</h2>';
    };

    // handle response
    xhr.onload = function () {
      var responseJSONcomic = JSON.parse(xhr.response);
      
      if (responseJSONcomic.data.count === 0) {
        document.getElementById("hero-part").innerHTML =
          '<h2 id="characterMainTitle" class="text-success"><span style="font-weight:bold;">No results... ' +
          "</span>" +
          ". Try defferent Heroes.</h2>";

        document.getElementById("comics-part-spinner").innerHTML = "";
      }
      else if (
        responseJSONcomic == undefined ||
        responseJSONcomic.length == 0
      ) {
        document.getElementById("hero-part").innerHTML =
          '<h2 id="characterMainTitle" class="text-success">' +
          "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";

        document.getElementById("comics-part-spinner").innerHTML = "";
      }
      else {
        // comics available
        const results = responseJSONcomic;
        let comics = responseJSONcomic.data.results;
        let comicSection = document.getElementById("comics-part");
        let output = "",
          creators = "";

        output +=
          '<div class="card-columns">';

        for (const i in comics) {
          if (comics.hasOwnProperty(i)) {
            const comic = comics[i];

            output +=
              '<div class="card" style="break-inside: avoid;">' +
              '<a href=""><img src="' +
              comic.thumbnail["path"] +
              "." +
              comic.thumbnail["extension"] +
              '" class="card-img-top x" alt="' +
              comic.title +
              '"></a>' +
              '<div class="card-body">' +
              '<h5 class="card-title x">' +
              comic.title +
              "</h5>";

            if (comic.description != null) {
              output +=
                '<p style="font-size: 12px;" class="card-text">' +
                comic.description +
                "</p>";
            }

            output +=
              '<p style="font-size: 12px;" class="card-text text-muted">Characters: ';

            for (const k in comic.characters.items) {
              if (comic.characters.items.hasOwnProperty(k)) {
                const character = comic.characters.items[k];
                output += character.name.concat(", ");
              }
            }

            output += "</p>";
            output +=
              '<p style="font-size: 12px;" class="card-text text-muted">Creators: ';

            for (const j in comic.creators.items) {
              if (comic.creators.items.hasOwnProperty(j)) {
                const creator = comic.creators.items[j];

                output += creator.name.concat(" (" + creator.role + "), ");
              }
            }

            output += "</p>";
            output +=
              "</div>" +
              '<div class="card-footer">' +
              '<small style="line-height: 1;" class="text-muted">' +
              results["attributionText"] +
              "</small>" +
              "</div>" +
              "</div>";
          }
        }

        output += "</div>";

        comicSection.innerHTML = output;
      }
    };

    // if loading completed
    xhr.onloadend = function () {
      document.getElementById("comics-part-spinner").innerHTML =
        '<h3 class="text-success"><strong id="spinnerText"></strong>Comics<h3>';
    };
    // if error
    xhr.onerror = function () {
      document.getElementById("hero-part").innerHTML =
        '<h2 id="characterMainTitle class="text-success"">An error has occured, check connection.</h2>';
      document.getElementById("comics-part").innerHTML =
        '<h2 id="characterMainTitle" class="text-success">An error has occured, check connection.</h2>';
    };

    xhr.open(
      "GET",
      `https://gateway.marvel.com/v1/public/characters/${id}/comics?&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
      true
    );

    xhr.send();
}

const clickEventHandler = (e) => {
  const target = e.target;
  // console.log(target);
  switch (target.className) {
    case "fa-brands fa-gratipay":
      addFav(parseInt(target.id));
      break;
    case "fa-brands fa-gratipay x":
      favHeroes();
      break;
    case "card-img-top":
    case "card-title":
      connection(target.id);
      break;
    case "home":
      fetchheroes("C");
      break;
    case "fa-brands fa-maxcdn":
      fetchheroes("D");
      break;
    case "fa-solid fa-user":
    case "fa-solid fa-bell":
    case "fa-solid fa-right-from-bracket":
      alert("This action is currently not active.");
      break;
    case "fa-solid fa-heart-circle-xmark":
      removeFav(parseInt(target.id));
      favHeroes();
      break;
    default:
      break;
  }

  if(target.id =="search-button")
  {
    heroDetails();
  }
};

  const startApp = () => {
    console.log("App runing...");
    // console.log("localStorage: ", arr);
    const nameInput = document.getElementById("name");

    document.addEventListener("click", clickEventHandler);
    nameInput.addEventListener("keyup", heroes);
    fetchheroes("S");
  };


  return {
    startApp: startApp,
    Author: "vikram kumar",
  };
})();