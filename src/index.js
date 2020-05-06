// document.addEventListener('DomContentLoaded', onLoad)
//
// function onLoad() {
//    fetchImages();
//    fetchBreeds();
// }
  document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
    // add event listener for select breeds
    const breedSelect = document.getElementById('breed-dropdown')
    breedSelect.addEventListener('change', filterBreeds)
  })

function fetchImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => renderImage(json.message))
}
  
  function renderImage(json) {
    const imageContainer = document.getElementById('dog-image-container')
    json.forEach(imageURL => {
        const img = document.createElement('img')
        img.src = imageURL
        imageContainer.appendChild(img)
      })     
  }

  function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => renderBreeds(json.message))
  }

  function renderBreeds(json) {
    const breedList = document.getElementById("dog-breeds");
    // lookup for...in

    for (const [key, value] of Object.entries(json)) {
        const li = document.createElement('li')
        // add class to li to reference later
        if(value) {
            li.innerText = `${value} ${key}`
            breedList.appendChild(li)
            li.addEventListener('click', changeColor);
            
        } else {
            li.innerText = key;
            breedList.appendChild(li)
            li.addEventListener('click', changeColor);
        }
    } 
  }

  function changeColor(event) {
    event.target.style.color = 'deeppink';
  }
 
  function filterBreeds(event) {
    const userSelection = event.target.value
    const breedList = document.getElementsByTagName('li')
    for (const breed of breedList) {
      if (breed.innerText.startsWith(userSelection)) {
          breed.style.display = ""
      } else {
            breed.style.display = "none"
      }
    }
  }