import { modulesToImport } from "../repertory.js";
import { clickOnBlueprint, toBindNodeClic,modulesLinked } from "./blueprint.js";
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Module qui définit les fonctions nécessaires à l'import de modules existants au projet
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// --------------------------
// Déclaration des variables
// --------------------------

// Espace dans lequel sont affichés les modules à importer dans le projet
const repertorySpace = document.getElementById("import__repertory")



// -----------------------
// Déclaration des classes
// -----------------------
class Module {
    constructor (name,input,output,icon){
        this.name = name;
        this.input = input;
        this.output = output;
        this.icon = icon;
    }
}


// -------------------------
// Déclaration des fonctions
// -------------------------

// fonction qui affiche un module dans le div "repertorySpace"
function displayModule(module) {
    let HTMLToAdd = `<div class="displayModuleContainer displayModule display${module.name}"><h3 class="display${module.name}">${module.name}</h3><img class="moduleIcon display${module.name}" src="./icons/moduleIconTest.svg"></div>`;
    repertorySpace.innerHTML+=HTMLToAdd;
}

// fonction qui affecte à la classe donnée la fonction de drag and drop
function bindDragAndDropImportModule () {
    for (let widget of document.getElementsByClassName("displayModule")) {
        widget.onclick = dragAndDropImportModule
    }
}

// fonction de drag and drop des modules à importer
function dragAndDropImportModule(event) {
    for (let module of modulesToImport) {
        if (event.target.className.includes(`display${module.name}`)) {
            const newModuleLinked = new Module(module.name,module.input,module.output,module.icon);
            modulesLinked.push(newModuleLinked);
            
            const iconModule = document.createElement("div");
            const iconImg = document.createElement("img");
            iconModule.appendChild(iconImg);
            iconImg.src = module.icon;
            iconImg.setAttribute("class","imgModule");
            iconModule.style.position = "absolute";
            iconModule.setAttribute("id","iconToDrag");
            iconModule.setAttribute("class",`iconModule ${module.name}`);
            document.getElementsByClassName("blueprint")[0].appendChild(iconModule);
            const nodeW = document.createElement("img");
            const nodeE = document.createElement("img");
            const nodeN = document.createElement("img");
            const nodeS = document.createElement("img");
            nodeW.src = "./icons/circle.svg";
            nodeE.src = "./icons/circle.svg";
            nodeS.src = "./icons/circle.svg";
            nodeN.src = "./icons/circle.svg";
            nodeW.setAttribute("class",`node ${module.name} nodeW`);
            nodeN.setAttribute("class",`node ${module.name} nodeN`);
            nodeS.setAttribute("class",`node ${module.name} nodeS`);
            nodeE.setAttribute("class",`node ${module.name} nodeE`);
            nodeW.style.top = "25px";
            nodeW.style.left = "0px";
            nodeN.style.left = "25px";
            nodeS.style.top = "50px";
            nodeS.style.left = "25px";
            nodeE.style.left = "50px";
            nodeE.style.top = "25px";
            nodeN.onclick = toBindNodeClic;
            iconModule.appendChild(nodeW);
            iconModule.appendChild(nodeE);
            iconModule.appendChild(nodeS);
            iconModule.appendChild(nodeN);


            document.getElementsByClassName("blueprint")[0].onmousemove = dragImportModule;
            document.getElementsByClassName("blueprint")[0].onclick = dropImportModule;
        }
    }
}

// fonction de drag des modules à importer
function dragImportModule(event) {
    const iconToDrag = document.getElementById(`iconToDrag`);
    iconToDrag.style.top = `${event.layerY+20}px`;
    iconToDrag.style.left = `${event.layerX+20}px`;
}

// fonction de drop des modules à importer
function dropImportModule(event) {
    document.getElementById("iconToDrag").setAttribute("id","");
    document.getElementsByClassName("blueprint")[0].onmousemove = null;
    document.getElementsByClassName("blueprint")[0].onclick = clickOnBlueprint;
}

export {
    displayModule,
    bindDragAndDropImportModule,
    modulesLinked
}