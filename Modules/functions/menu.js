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
    
    // Destruction de l'actuel canvas "blueprint"
    document.getElementById("blueprint").style.transition = "all .5s ease-in-out"
    document.getElementById("blueprint").style.opacity = "0%"

    setTimeout(()=>{
        document.body.removeChild(document.getElementById("blueprint"));
        // création du nouveau canvas "blueprint" 
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id","blueprint");
        canvas.style.opacity = "0%";
        canvas.style.transition = "all .5s ease-in-out";
        document.body.appendChild(canvas);

        // Mise en place du projet paper.js relié au canvas
        paper.setup(canvas);

        // ajout de l'image du module à définir
        const imgNewModule = document.createElement("img");
        imgNewModule.src = "./icons/halloween.png";
        imgNewModule.onload = ()=> {
            
            // création du raster englobant l'image créée positionné au centre du canvas 
            // et redimensionné à 200x200px
            const rasterNewModule = new paper.Raster(imgNewModule);
            rasterNewModule.position = rasterNewModule.view.center;
            rasterNewModule.scale(200/rasterNewModule.width,200/rasterNewModule.height);
            // ajout d'un "name" pour identifier le raster et le module que l'on définit
            rasterNewModule.name = `mainModule ${name}`;
            // dessin de la vue
            paper.view.draw();
            // modification de l'opacitée en transition
            canvas.style.opacity = "100%";
        }

    },500)
}

// ---------------------
// Binding des bouttons
// ---------------------
buttonNew.onclick = createOptionNewModule

export {unwrapMenu, wrapMenu, wrapOrNo}