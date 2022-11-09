import {clickOnBlueprint} from "./blueprint.js"


// Module qui définit les fonctions nécessaires au fonctionnement de la barre de menu

// -------------------------
// Déclaration des variables
// -------------------------

// Bouton "File" 
const button = document.getElementsByClassName("menuTitle")[0].getElementsByTagName("button")[0];
// Menu à dérouler sous le bouton "File"
const wrappedFileMenu = document.getElementsByClassName("menuFile__wrapped")[0];
// Flèche symbolisant le menu "File"
const menuFileIcon = document.getElementById("menuFileIcon");
// Bouton "New Module"
const buttonNew = document.getElementById("menuFile__NewModule");

// --------------------------
// Déclaration des fonctions 
// --------------------------

// fonction de déroulage du menu
function unwrapMenu(event) {
    wrappedFileMenu.style.opacity = "100%"
    wrappedFileMenu.style.height = "100px"
    menuFileIcon.style.transform = "rotate(90deg)"
}

// fonction d'enroulage du menu
function wrapMenu(event) {
    wrappedFileMenu.style.opacity = "0%"
    wrappedFileMenu.style.height = "0px"
    menuFileIcon.style.transform = "rotate(0deg)"
}

// fonction qui définit si un clic doit entrainer l'enroulage ou le déroulage du menu
function wrapOrNo(event) {
    if (event.target != button) {
        wrapMenu(event)
    }
    else {
        unwrapMenu(event)
    }
}

// fonction qui définit la création d'une nouvelle page Module

// fonction qui crée un div en dessous du boutton New module pour spécifier le nom du module à créer
function createOptionNewModule () {
    const optionNewModule = document.createElement("div");
    optionNewModule.innerHTML="<p class='optionElement'>Quel est le nom du module à créer? (Pas d'espace svp)</p><input type='text' id='nameNewModule' class='optionElement'><button id='okNewModule' class='optionElement'>Ok</button>";
    optionNewModule.setAttribute("class","optionBar");
    const header = document.getElementsByTagName("header")[0];
    header.appendChild(optionNewModule);
    optionNewModule.style.height = "50px";
    
    function createNewModuleOnClick () {
        createNewModule(optionNewModule,document.getElementById("nameNewModule").value)
    }

    document.getElementById("okNewModule").onclick = createNewModuleOnClick
}

// fonction qui crée un nouveau module avec en class le nom du module
function createNewModule(optionDiv,name) {
    
    // disparition en transition et destruction du div "optionDiv"
    for (let element of document.getElementsByClassName("optionElement")){
        element.style.transition="all .5s ease-in-out";
        element.style.opacity="0%";
    };
    setTimeout(()=>{
        for (let element of document.getElementsByClassName("optionElement")){
            element.style.display = "none";
        };
        document.getElementsByTagName("header")[0].removeChild(optionDiv);
    },500);
    
    // Destruction de l'actuel div "blueprint"
    document.getElementsByClassName("blueprint")[0].style.transition = "all .5s ease-in-out"
    document.getElementsByClassName("blueprint")[0].style.opacity = "0%"

    setTimeout(()=>{
        document.getElementsByClassName("blueprintSpace")[0].removeChild(document.getElementsByClassName("blueprint")[0]);
        // création du nouveau div "blueprint" 
        const newBlueprint = document.createElement("div");
        newBlueprint.setAttribute("class","blueprint");
        newBlueprint.style.opacity = "0%";
        newBlueprint.style.transition = "all .5s ease-in-out";
        document.getElementsByClassName("blueprintSpace")[0].appendChild(newBlueprint);
        // ajout de l'image du module à définir
        const imgNewModule = document.createElement("img"); 
        imgNewModule.setAttribute("class",`mainModule ${name}`);
        imgNewModule.src="./icons/mainModuleTest.svg";
        newBlueprint.appendChild(imgNewModule);
        newBlueprint.style.display = "flex";
        newBlueprint.style.justifyContent = "center"; 
        newBlueprint.style.alignItems = "center";
        newBlueprint.style.opacity = "100%";
        newBlueprint.onclick = clickOnBlueprint;
    },500)
}

// ---------------------
// Binding des bouttons
// ---------------------
buttonNew.onclick = createOptionNewModule

export {unwrapMenu, wrapMenu, wrapOrNo}