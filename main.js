
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
}

const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((animals) => {
        domString += `<div class="animal">
                        <h2>${animals.name}</h2>
                        <h3>${animals.number}</h3>
                        <img class="animal-image"src="${animals.imageUrl}" alt="animal" height="200px" width="250px">
                        <div>
                            <button>Escaped</button>
                        </div>
                     </div>`;
    })
    printToDom(domString, 'zoo');
}

function executeThisCodeIfXHRFails () {
    console.log("error");
}

function executeThisCodeAfterFileIsLoaded () {
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
}



//build domString here

