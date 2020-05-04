console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    const breedUrl = 'https://cors-anywhere.herokuapp.com/https://dog.ceo/api/breeds/list/all'

    const imgContainer = document.getElementById('dog-image-container')
    imgContainer.style.width = '75%'
    imgContainer.style.margin = 'auto'

    const dogBreedList = document.getElementsByTagName('ul')[0]
    let originalDogBreedList

    const breedOption = document.getElementById('breed-dropdown')

    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => {
            for (const dogImage of json.message) {
                const imgBreed = dogImage.split("/")[4]
                const imgTag = document.createElement('img')
                
                imgTag.src = dogImage
                imgTag.style.display = 'block'
                imgTag.style.margin = 'auto'
                imgTag.style.width = '550px'
                imgContainer.appendChild(imgTag)

                const pTag = document.createElement('p')
                
                pTag.innerText = imgBreed.toUpperCase()
                pTag.style.fontSize = '20px'
                pTag.style.textAlign = 'center'
                imgContainer.appendChild(pTag)
            }
        })

    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            for (const breed in json.message) {
                const listElement = document.createElement('li')
                listElement.innerText = breed.charAt(0).toUpperCase() + breed.slice(1)
                listElement.style.fontSize = '20px'
                listElement.addEventListener('click', () => {
                    listElement.style.color = 'green'
                })
                dogBreedList.appendChild(listElement)   
            }
            originalDogBreedList ={...dogBreedList.children}
        })
        
        breedOption.addEventListener('change', (event) => {
            const selection = event.target.value

            if (selection == 'All') {
                dogBreedList.innerHTML = " "
                Object.keys(originalDogBreedList).forEach(listItem => 
                    dogBreedList.appendChild(originalDogBreedList[listItem]))    
            }
            else {
                dogBreedList.innerHTML = " "

                Object.keys(originalDogBreedList).forEach(listItem => {
                    if (originalDogBreedList[listItem].innerText.charAt(0).toLowerCase() == selection) {
                        dogBreedList.appendChild(originalDogBreedList[listItem])
                    }
                })
            }
        })
})