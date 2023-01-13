// searching and filtering heroes 
const heroes = () => {
  const xhr = new XMLHttpRequest();
  var name = document.getElementById("name").value;
  if(name=="")
  name="bat";

  // response handling
  xhr.onload = function () {
    var responseJSON = JSON.parse(xhr.response);
    
    let html = "";
    html += "<div class='row heroes-row'>";
    if (responseJSON.response == "success") {
      responseJSON.results.forEach((item) => {
        html +=
          `
                <div class="col-3" style = "margin-top = 50px;">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${item.image.url}">
                    <div class="card-body">
                        <span> <h5 class="card-title">${item.name}` +
          "&nbsp;" +
          `<button id="heart-button"><i id="${item.id}" class="fa-brands fa-gratipay" style:"align-items:right;></i></button></h5></span>
                    </div>
                </div>
                </div>    `;
      });
    }
    document.getElementById("cards-group").innerHTML = html;
  };

  // error handling
  xhr.onerror = function () {
    document.getElementById("characterSection").innerHTML =
      '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
  };

  //sending request
  xhr.open(
    "GET",
    `https://www.superheroapi.com/api.php/586069776286026/search/${name}`,
    true
  );
  xhr.send();
};
