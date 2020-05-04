console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let fullBreedList = []

// display images 

function parseImgJson(json) {
    json["message"].forEach(displayImage)    
}

function displayImage(value) {
    const body = document.getElementsByTagName('body')[0]
    const div = document.createElement('div')
    
    div.innerHTML = `<img src=${value} alt="Can't find it">`
    body.appendChild(div)
}

// list breeds 

function parseBreedJson(json) {        
    for (const breed in json["message"]) {
        displayBreed(breed);
      }     
}

function displayBreed(breed) {
    const dogsList = document.getElementById('dog-breeds')
    const li = document.createElement('li')

    li.innerHTML = `<li>${breed}</li>`
    dogsList.appendChild(li)

    li.addEventListener('click', function(e) {
        li.innerHTML = `<li style="color:blue">${breed}</li>`
    })
   
    filterBreedList() // only filter list after DOM is loaded and list is displayed 
}

// filter list by starting letter 

function filterBreedList() {    
    const selectedLetter = document.getElementById('breed-dropdown')

    
    selectedLetter.addEventListener('change', function(e){
        const list = document.getElementById("dog-breeds").getElementsByTagName("li");          
       
        for (let i = 0; i < list.length; i++) {
            removeNonMatches(list[i], selectedLetter.value); 
        }    
    })
  
}

function removeNonMatches(liElement, selectedLetter) {

    if (liElement.innerText[0] != selectedLetter) {
        liElement.remove()
    }
}

// after DOM is loaded call functions 

document.addEventListener('DOMContentLoaded', function() {  
     
    fetch(imgUrl).then(resp => resp.json()).then(json => parseImgJson(json));  
    fetch(breedUrl).then(resp => resp.json()).then(json => parseBreedJson(json));  
  })
  