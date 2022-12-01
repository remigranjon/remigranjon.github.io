import { modulesToImport } from "./Modules/repertory.js"
import * as menu from "./Modules/functions/menu.js"
import * as importModule from "./Modules/functions/import.js"

// -------------------------
// Déclaration des variables
// -------------------------
// liste des links existants
// let links = [];
// let nodes = [];
// let modulesLinked = [];

// -----------------------
// Déclaration des classes
// -----------------------



// -------------------------
// Déclaration des fonctions
// -------------------------






// ---------------------
// Déclaration du Script
// ---------------------

// binding de l'enroulage/déroulage du menu
document.body.onclick = menu.wrapOrNo

// Affichage des modules à importer
for (let module of modulesToImport) {
    importModule.displayModule(module);  
}

window.onload = function() {
    var canvas = document.getElementById("blueprint");
    paper.setup(canvas);
    // const project = new paper.Project();
    paper.view.draw();
    // Binding de la fonction drag and drop lors de l'import des modules
    importModule.bindDragAndDropImportModule();

}


