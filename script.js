import { modulesToImport } from "./Modules/repertory.js"
import * as menu from "./Modules/functions/menu.js"
import * as importModule from "./Modules/functions/import.js"

// -------------------------
// Déclaration des variables
// -------------------------
// liste des links existants
let links = [];
let nodes = [];



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
    importModule.displayModule(module)  
}

// Binding de la fonction drag and drop lors de l'import des modules
importModule.bindDragAndDropImportModule();

