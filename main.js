
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
        domString += `<h2>${animals.name}</h2>`;
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

