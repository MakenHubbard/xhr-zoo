
const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileIsLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}


startApplication();


const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
    addEscapedEventListeners();
}

const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((animals) => {
        if (animals.isCarnivore){
            domString +=`<div class="animals carn">`;
        } else {
            domString += `<div class="animals veg">`;
        }
        domString += 
                        `<h2>${animals.name}</h2>
                        <h3>${animals.number}</h3>
                        <img class="animals-image"src="${animals.imageUrl}" alt="animal" height="200px" width="250px">
                        <div>
                            <button class="escaped">Escaped</button>
                        </div>
                     </div>`;
    })
    printToDom(domString, 'zoo');
}

const addEscapedEventListeners = () => {
    const escapedButtons = document.getElementsByClassName('escaped');
    for (let i=0; i<escapedButtons.length; i++){
        escapedButtons[i].addEventListener('click', animalEscaped);
    }
}


const animalEscaped = (e) => { 
    const badAnimalButtonContainer = e.target.parentNode;
    showCarnivores();
    showVegetables();
    showFoundButton(badAnimalButtonContainer);
}

const showFoundButton = (buttonContainer) => {
    buttonContainer.innerHTML = `<button id="found">Found</button>`;
    initializeFoundButton();
}

const initializeFoundButton = () => {
    const foundButton = document.getElementById('found');
    foundButton.addEventListener('click', () => {
        const animals = document.getElementsByClassName('animals');
        for (let m=0; m<animals.length; m++){
            animals[m].children[3].innerHTML = '<button class="escaped">Escaped</button>';
            animals[m].classList.remove("green");
            animals[m].classList.remove("red");
        }
        addEscapedEventListeners();
    });
}

const showCarnivores = () => {
    const carnivores = document.getElementsByClassName('carn');
    for (let j=0; j<carnivores.length; j++ ){
        carnivores[j].children[3].innerHTML = '';
        carnivores[j].classList.add("red");
    }    
};


const showVegetables = () => {
    const vegetables = document.getElementsByClassName('veg');
    for (let h=0; h<vegetables.length; h++) {
        vegetables[h].children[3].innerHTML = '<button>EAT ME !!!</button>';
        vegetables[h].classList.add("green");
    }
};







function executeThisCodeIfXHRFails () {
    console.log("error");
}

function executeThisCodeAfterFileIsLoaded () {
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
}