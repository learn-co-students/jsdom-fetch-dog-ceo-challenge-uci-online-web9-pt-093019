
  document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
  })

function fetchImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(result => renderImage(result.message))
  }
  
  function renderImage(result) {
    const imageContainer = document.getElementById('dog-image-container')
    result.forEach(imageURL => {
        const img = document.createElement('img')
        img.src = imageURL
        imageContainer.appendChild(img)
      })     
  }

  function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(result => renderBreeds(result.message))
  }

  function renderBreeds(result) {
    const breedList = document.getElementById("dog-breeds");
    for (const [key, value] of Object.entries(result)) {
        const li = document.createElement('li')
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
  
