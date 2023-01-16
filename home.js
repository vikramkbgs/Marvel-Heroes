var App = (function (){
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
    if(name.length >0)
    xhr.onload = function () {
      var responseJSON = JSON.parse(xhr.response);
      console.log(responseJSON);
      const items = responseJSON.data.results;
      const count = Object.keys(items).length;

      let html = "";
      html += "<div class='card-columns'>";
      if (count > 0) {
        items.forEach((item) => {
          html +=
            `
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
         document.getElementById("alt-message").innerHTML ="";
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
        '<h2>An error has occured, check connection.</h2>';
    };

    //sending request
    xhr.open(
      "GET",
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=01302fe8616347c6decaf8fc30e088f9&hash=ba81f8fdf7e1f5233e29dc5a8d5a227a`,
      true
    );
    xhr.send();
  };

  function startApp() {

    console.log("App runing...");
    // document.addEventListener("key", heroes);
    document.getElementById("name").addEventListener("keyup",heroes);
    fetchheroes("Dea");
  }
  //   startApp();
  return {
    startApp: startApp,
    Author: "vikram kumar"
  };
})();