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

   function heroDetails() {
     // input from from 
      var name = document.getElementById("name").value;
      console.log(name);

     if (name !== null && name !== "") {
       connection();
     } else {
       fetchheroes("I");
     }
   }

   function connection() {

    document.getElementById("hero-part").innerHTML = " ";
    document.getElementById("comics-part").innerHTML = "";
    document.getElementById("alt-message").innerHTML = "";
    document.getElementById("cards-group").innerHTML = "";

     const xhr = new XMLHttpRequest();
     const name = document.getElementById("name").value;
     const params = "name=" + name;

    //  console.log(name);

     // ON LOAD-START
     xhr.onloadstart = function () {
       document.getElementById("hero-part-spinner").innerHTML =
         '<strong id="spinnerText" class="text-primary">Loading character...</strong>' +
         '<div class="text-primary spinner-border ml-auto" role="status" ' +
         'aria-hidden="true" id="spinner"></div>';
     };
     // IN CASE OF ERROR
     xhr.onerror = function () {
       document.getElementById("alt-message").innerHTML =
         '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
     };

     // INCASE OF NO ERROR load
     xhr.onload = function () {
       var responseJSON = JSON.parse(xhr.response);
       // console.log(responseJSON);
       // console.log(responseJSON.data.results[0].comics);
       console.log(responseJSON.data.count);
       // IF THE COUNT IS 0 MEANS NO DATA AVAILABLE
       if (responseJSON.data.count === 0) {
         document.getElementById("hero-part").innerHTML =
           '<h2 id="characterMainTitle"><span style="font-weight:bold;">No results for... ' +
           name +
           "</span>" +
           ". Try again.</h2>";

         document.getElementById("hero-part-spinner").innerHTML = "";
         // document.getElementById("comicsSpinnerSection").innerHTML = "";
       }
       // IF SOMETHING WRONG WRITTEN IN THE INPUT
       else if (responseJSON == undefined || responseJSON.length == 0) {
         document.getElementById("hero-part").innerHTML =
           '<h2 id="characterMainTitle">' +
           "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";

         document.getElementById("hero-part-spinner").innerHTML = "";
         // document.getElementById("comicsSpinnerSection").innerHTML = "";
       }
       // IF EVERYTHING IS FINE
       else {
         const characterAttributes = responseJSON.data.results[0],
           characterID = responseJSON.data.results[0].id;
         // THE CHACTER INFO SECTION
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

     // INCASE OF LOAD END
     xhr.onloadend = function () {
       document.getElementById("hero-part-spinner").innerHTML =
         '<strong id="spinnerText" class="text-success">done</strong>';
     };

     xhr.open(
       "GET",
       `https://gateway.marvel.com/v1/public/characters?${params}&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
       true
     );

     xhr.send();
   }

   //COMICS SECTION
   function comics(characterID) {
     const xhr = new XMLHttpRequest();
     var id = characterID;

     //LOAD START OF COMICS SECTION
     xhr.onloadstart = function () {
       document.getElementById("comics-part-spinner").innerHTML =
         '<strong id="spinnerText" class="text-danger">Loading comics below...</strong>' +
         '<div class="spinner-border text-danger ml-auto" role="status" ' +
         'aria-hidden="true" id="spinner"></div>';
     };
     //IN CASE OF ERROR
     xhr.onerror = function () {
       document.getElementById("hero-part").innerHTML =
         '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
       document.getElementById("comics-part").innerHTML =
         '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
     };

     // ON LOAD SECTION
     xhr.onload = function () {
       var responseJSONcomic = JSON.parse(xhr.response);
       // console.log(responseJSONcomic.data.results);

       // IF THE COUNT IS 0 MEANS NO DATA AVAILABLE
       if (responseJSONcomic.data.count === 0) {
         document.getElementById("hero-part").innerHTML =
           '<h2 id="characterMainTitle"><span style="font-weight:bold;">No results for... ' +
           "</span>" +
           ". Try defferent Heroes.</h2>";

         // document.getElementById("characterSpinnerSection").innerHTML = "";
         document.getElementById("comics-part-spinner").innerHTML = "";
       }
       // IF SOMETHING WRONG WRITTEN IN THE INPUT
       else if (
         responseJSONcomic == undefined ||
         responseJSONcomic.length == 0
       ) {
         document.getElementById("hero-part").innerHTML =
           '<h2 id="characterMainTitle">' +
           "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";

         // document.getElementById("characterSpinnerSection").innerHTML = "";
         document.getElementById("comics-part-spinner").innerHTML = "";
       }
       // IF EVERYTHING IS FINE
       else {
         // comics available
         const results = responseJSONcomic;
         let comics = responseJSONcomic.data.results;
         let comicSection = document.getElementById("comics-part");
         let output = "",
           creators = "";

         output +=
           '<h2 id="comicMainTitle" >Comics</h2>' +
           '<div class="card-columns">';

         for (const i in comics) {
           if (comics.hasOwnProperty(i)) {
             const comic = comics[i];

             output +=
               '<div class="card">' +
               '<a href=""><img src="' +
               comic.thumbnail["path"] +
               "." +
               comic.thumbnail["extension"] +
               '" class="card-img-top" alt="' +
               comic.title +
               '"></a>' +
               '<div class="card-body">' +
               '<h5 class="card-title">' +
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

     // IF LOADING.. IS DONE
     xhr.onloadend = function () {
       document.getElementById("comics-part-spinner").innerHTML =
         '<strong id="spinnerText" class="text-success"></strong>';
     };
     // ON ERROR
     xhr.onerror = function () {
       document.getElementById("hero-part").innerHTML =
         '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
       document.getElementById("comics-part").innerHTML =
         '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
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

    if (target.id == "search-button") {
      console.log("heroDetails");
      heroDetails();
      return;
    }
  };

  function startApp() {
    console.log("App runing...");
    console.log("localStorage: ", arr);

    // document.addEventListener("click", clickEventHandler);
    document.getElementById("name").addEventListener("keyup", heroes);
    // document.getElementById("searchForm").addEventListener("click", heroDetails);
    document.getElementById("search-button").addEventListener("click", heroDetails);
    fetchheroes("Dea");
  }
  //   startApp();
  return {
    startApp: startApp,
    Author: "vikram kumar",
  };
})();
