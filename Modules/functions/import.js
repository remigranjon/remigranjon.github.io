// import { project } from "../../node_modules/paper/dist/paper-core.js";
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
    let HTMLToAdd = `<div class="displayModuleContainer displayModule display${module.name}"><h3 class="display${module.name}">${module.name}</h3><img class="moduleIcon display${module.name}" src=${module.icon}></div>`;
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
            
            const rasterIcon = new paper.Raster(module.icon);
            rasterIcon.size = new paper.Size([30,30]);
            const nodeN = new paper.Shape.Circle({
                center: [5,5],
                radius: 5,
                strokeColor: "black",
                fillColor: "white",
                opacity: 0,
                name: module.name,
            });
            nodeN.onClick = toBindNodeClic;
            const nodeS = nodeN.clone();
            const nodeE = nodeN.clone();
            const nodeW = nodeN.clone();
            nodeN.onMouseEnter = (event) => {
                event.target.opacity = 1;
            }
            nodeN.onMouseLeave = (event) => {
                event.target.opacity = 0;
            }
            nodeS.onMouseEnter = (event) => {
                event.target.opacity = 1;
            }
            nodeS.onMouseLeave = (event) => {
                event.target.opacity = 0;
            }
            nodeE.onMouseEnter = (event) => {
                event.target.opacity = 1;
            }
            nodeE.onMouseLeave = (event) => {
                event.target.opacity = 0;
            }
            nodeW.onMouseEnter = (event) => {
                event.target.opacity = 1;
            }
            nodeW.onMouseLeave = (event) => {
                event.target.opacity = 0;
            }
            const group = new paper.Group([nodeN,nodeS,nodeE,nodeW,rasterIcon]);
            group.size = [60,60];
            nodeN.position = [30,5];
            nodeS.position = [30,55];
            nodeW.position = [5,30];
            nodeE.position = [55,30];
            rasterIcon.position = [30,30];
            
            group.position = [event.pageX+20,event.pageY+20];
            
            group.name = `iconToDrag icon${module.name}`;
            nodeN.name += " nodeN";
            nodeS.name += " nodeS";
            nodeE.name += " nodeE";
            nodeW.name += " nodeW";
 
            document.body.onmousemove = dragImportModule;
            document.getElementById("blueprint").onclick = dropImportModule;
        }
    }
}

// fonction de drag des modules à importer
function dragImportModule(event) {
    for (let child of paper.project.activeLayer.children) {
        if (child.name.includes("iconToDrag")) {
            child.position = [event.pageX+20,event.pageY+20];

        }
    }
}

// fonction de drop des modules à importer
function dropImportModule(event) {
    console.log(paper.project.activeLayer.children);
    for (let child of paper.project.activeLayer.children) {
        if (child.name.includes("iconToDrag")) {
            // on enlève iconToDrag du name
            child.name = child.name.slice(11);
        }
    }
    document.body.onmousemove = null;
    document.getElementById("blueprint").onclick = null;

}


// function dropImportModule(event) {
//     document.getElementById("iconToDrag").setAttribute("id","");
//     document.body.onmousemove = null;
//     document.getElementsByClassName("blueprint")[0].onclick = clickOnBlueprint;
// }


// function dragImportModule(event) {
//     const iconToDrag = document.getElementById(`iconToDrag`);
//     iconToDrag.style.top = `${event.layerY+20}px`;
//     iconToDrag.style.left = `${event.layerX+20}px`;
// }

// function dragAndDropImportModule(event) {
    //     for (let module of modulesToImport) {
//         if (event.target.className.includes(`display${module.name}`)) {
//             const newModuleLinked = new Module(module.name,module.input,module.output,module.icon);
//             modulesLinked.push(newModuleLinked);
            
//             const iconModule = document.createElement("div");
//             const iconImg = document.createElement("img");
//             iconModule.appendChild(iconImg);
//             iconImg.src = module.icon;
//             iconImg.setAttribute("class","imgModule");
//             iconModule.style.position = "absolute";
//             iconModule.style.top = `${event.layerY+20}px`;
//             iconModule.style.left = `${event.layerX+20}px`;
//             iconModule.setAttribute("id","iconToDrag");
//             iconModule.setAttribute("class",`iconModule ${module.name}`);
//             document.getElementsByClassName("blueprint")[0].appendChild(iconModule);
//             const nodeW = document.createElement("img");
//             const nodeE = document.createElement("img");
//             const nodeN = document.createElement("img");
//             const nodeS = document.createElement("img");
//             nodeW.src = "./icons/circle.svg";
//             nodeE.src = "./icons/circle.svg";
//             nodeS.src = "./icons/circle.svg";
//             nodeN.src = "./icons/circle.svg";
//             nodeW.setAttribute("class",`node ${module.name} nodeW`);
//             nodeN.setAttribute("class",`node ${module.name} nodeN`);
//             nodeS.setAttribute("class",`node ${module.name} nodeS`);
//             nodeE.setAttribute("class",`node ${module.name} nodeE`);
//             nodeW.style.top = "25px";
//             nodeW.style.left = "0px";
//             nodeN.style.left = "25px";
//             nodeS.style.top = "50px";
//             nodeS.style.left = "25px";
//             nodeE.style.left = "50px";
//             nodeE.style.top = "25px";
//             nodeN.onclick = toBindNodeClic;
//             iconModule.appendChild(nodeW);
//             iconModule.appendChild(nodeE);
//             iconModule.appendChild(nodeS);
//             iconModule.appendChild(nodeN);


//             document.body.onmousemove = dragImportModule;
//             document.getElementsByClassName("blueprint")[0].onclick = dropImportModule;
//         }
//     }
// }




export {
    displayModule,
    bindDragAndDropImportModule
}