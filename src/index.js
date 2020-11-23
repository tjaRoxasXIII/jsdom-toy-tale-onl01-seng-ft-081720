let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  loadToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        submitData(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
    
  });
});


function loadToys() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json)
      for (const toy of json) {
        console.log(toy)
        buildToy(toy)
      }
    })
  }

function likeToy(toy) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  };
  
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
    
    })
}
  function buildToy(toy) {
    let div = document.createElement("div")
      div.className = "card"

      let h2 = document.createElement("h2")
      h2.innerText = `${toy.name}`

      let img = document.createElement("img")
      img.src = toy.image
      img.style.height = "200px"
      img.style.width = "200px"

      let p = document.createElement("p")
      p.innerText = toy.likes

      let button = document.createElement("button")
      button.innerText = "Like <3"
      button.className = "like-btn"
      button.onclick = likeToy(toy)

      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(button)

      console.log(div)

      document.getElementById("toy-collection").appendChild(div)
  }

function submitData(toyObject) {
  // debugger
  let configurationObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
  
    body: JSON.stringify({
      "name": toyObject.name.value,
      "image": toyObject.image.value,
      "likes": 0
    })
    }
  fetch("http://localhost:3000/toys", configurationObject) 
    .then(function(response) {
      // debugger
      return response.json();
    })
    .then(function(json) {
      debugger
      buildToy(toy)
    });
  
}

