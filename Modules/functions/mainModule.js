// classe définissant une variable par :
//  - son type (input,output,intrinsic,integration,internal,constant)
//  - son nom (la variable sera par la suite appelée par celui-ci)
//  - sa description
//  - son unité
//  - ses valeurs minimales et maximales
//  - sa valeur conventionnelle
class Variable {
    constructor(type,name,description="",unit="",min="",max="",conv="") {
        this.type = type;
        this.name = name;
        this.description = description;
        this.unit = unit;
        this.min = min;
        this.max = max;
        this.conv = conv;
    }
}


class ModuleExtended {
    constructor(name,icon,inputs=[],outputs=[],intrinsics=[],integrations=[],constants=[],internals=[],equations=[]) {
        this.name = name;
        this.icon = icon;
        this.inputs = inputs;
        this.outputs = outputs;
        this.intrinsics = intrinsics;
        this.integrations = integrations;
        this.constants = constants;
        this.internals = internals;
        this.equations = equations;
    }

    addInput(input) {
        this.inputs.push(input);
    }
    
    addOutput(output) {
        this.outputs.push(output);
    }
    
    // // méthode qui affiche un div pour paramétrer le module au double-clic sur son icône
    // displayModule() {
    //     // invisibilisation du canvas "blueprint"
    //     document.getElementsByTagName("canvas")[0].style.opacity = "0%";
    //     // affichage du div "mainModule"
    //     const mainModuleDiv = document.getElementsByClassName("mainModule--undisplayed")[0];
    //     mainModuleDiv.setAttribute("class","mainModule");
    //     this.bindingAdd("outputs");
    //     this.bindingAdd("intrinsics");
    //     this.bindingAdd("integrations");
    //     this.bindingAdd("constants");
    //     this.bindingAdd("inputs");
    //     this.bindingAdd("internals");
    //     this.updateParametersFrame();
    //     // binding du retour à l'écran au double clic sur le nom du module
    //     document.getElementsByClassName("mainModule__title")[0].getElementsByTagName("h2")[0].ondblclick = this.hideModule;
    //     setTimeout(()=>{
    //         mainModuleDiv.style.opacity =  "100%";
    //     },500);
    // }
        
    // // fonction qui bind le bouton ajouter du div ayant comme classe "classname"
    // bindingAdd (type) {
    //     const bindedDiv = document.getElementsByClassName(`mainModule__${type}`)[0];
    //     console.log(bindedDiv.getElementsByTagName("button")[0]);
    //     switch (type) {
    //         case "outputs" :
    //             bindedDiv.getElementsByTagName("button")[0].onclick = (event)=> {
    //                 event.preventDefault();
    //                 const line = document.createElement("li");
    //                 const input = bindedDiv.getElementsByTagName("input")[0].value;
    //                 line.innerHTML = `<p>${input}</p>`;
    //                 line.ondblclick = DblclickToRemove;
    //                 bindedDiv.getElementsByTagName("ul")[0].appendChild(line);
    //                 this.outputs.push(input);
    //             };
    //             break;
    //         case "inputs" :
    //             bindedDiv.getElementsByTagName("button")[0].onclick = (event)=> {
    //                 event.preventDefault();
    //                 const line = document.createElement("li");
    //                 const input = bindedDiv.getElementsByTagName("input")[0].value;
    //                 line.innerHTML = `<p>${input}</p>`;
    //                 line.ondblclick = DblclickToRemove;
    //                 bindedDiv.getElementsByTagName("ul")[0].appendChild(line);
    //                 this.inputs.push(input);
    //             };
    //             break;
    //         case "intrinsics" :
    //             bindedDiv.getElementsByTagName("button")[0].onclick = (event)=> {
    //                 event.preventDefault();
    //                 const line = document.createElement("li");
    //                 const input = bindedDiv.getElementsByTagName("input")[0].value;
    //                 line.innerHTML = `<p>${input}</p>`;
    //                 line.ondblclick = DblclickToRemove;
    //                 bindedDiv.getElementsByTagName("ul")[0].appendChild(line);
    //                 this.intrinsics.push(input);
    //             };
    //             break;
    //         case "integrations" :
    //             bindedDiv.getElementsByTagName("button")[0].onclick = (event)=> {
    //                 event.preventDefault();
    //                 const line = document.createElement("li");
    //                 const input = bindedDiv.getElementsByTagName("input")[0].value;
    //                 line.innerHTML = `<p>${input}</p>`;
    //                 line.ondblclick = DblclickToRemove;
    //                 bindedDiv.getElementsByTagName("ul")[0].appendChild(line);
    //                 this.integrations.push(input);
    //             };
    //             break;
    //         case "internals" :
    //             bindedDiv.getElementsByTagName("button")[0].onclick = (event)=> {
    //                 event.preventDefault();
    //                 const line = document.createElement("li");
    //                 const input = bindedDiv.getElementsByTagName("input")[0].value;
    //                 line.innerHTML = `<p>${input}</p>`;
    //                 line.ondblclick = DblclickToRemove;
    //                 bindedDiv.getElementsByTagName("ul")[0].appendChild(line);
    //                 this.internals.push(input);
    //             };
    //             break;
    //         case "constants" :
    //             bindedDiv.getElementsByTagName("button")[0].onclick = (event)=> {
    //                 event.preventDefault();
    //                 const line = document.createElement("li");
    //                 const input = bindedDiv.getElementsByTagName("input")[0].value;
    //                 line.innerHTML = `<p>${input}</p>`;
    //                 line.ondblclick = DblclickToRemove;
    //                 bindedDiv.getElementsByTagName("ul")[0].appendChild(line);
    //                 this.constants.push(input);
    //             };
    //             break;
    //     }
    // }
        
    // // Méthode qui remplit la frame de définition des paramètres en fonction des différents paramètres déjà renseignés
    // updateParametersFrame() {
    //     document.getElementsByClassName("mainModule__title")[0].getElementsByTagName("h2")[0].innerHTML = this.name;
    //     // update des inputs
    //     const inputsUl = document.getElementsByClassName("mainModule__inputs")[0].getElementsByTagName("ul")[0];
    //     inputsUl.innerHTML="";
    //     for (let input of this.inputs) {
    //         const line = document.createElement("li");
    //         line.innerHTML = `<p>${input}</p>`;
    //         line.ondblclick = DblclickToRemove;
    //         inputsUl.appendChild(line);
    //     }
    //     // update des outputs
    //     const outputsUl = document.getElementsByClassName("mainModule__outputs")[0].getElementsByTagName("ul")[0];
    //     outputsUl.innerHTML="";
    //     for (let output of this.outputs) {
    //         const line = document.createElement("li");
    //         line.innerHTML = `<p>${output}</p>`;
    //         line.ondblclick = DblclickToRemove;
    //         outputsUl.appendChild(line);
    //     }
    //     // update des intrinsics
    //     const intrinsicsUl = document.getElementsByClassName("mainModule__intrinsics")[0].getElementsByTagName("ul")[0];
    //     intrinsicsUl.innerHTML="";
    //     for (let intrinsic of this.intrinsics) {
    //         const line = document.createElement("li");
    //         line.innerHTML = `<p>${intrinsic}</p>`;
    //         line.ondblclick = DblclickToRemove;
    //         intrinsicsUl.appendChild(line);
    //     }
    //     // update des integrations
    //     const integrationsUl = document.getElementsByClassName("mainModule__integrations")[0].getElementsByTagName("ul")[0];
    //     integrationsUl.innerHTML="";
    //     for (let integration of this.integrations) {
    //         const line = document.createElement("li");
    //         line.innerHTML = `<p>${integration}</p>`;
    //         line.ondblclick = DblclickToRemove;
    //         integrationsUl.appendChild(line);
    //     }
    //     // update des internals
    //     const internalsUl = document.getElementsByClassName("mainModule__internals")[0].getElementsByTagName("ul")[0];
    //     internalsUl.innerHTML="";
    //     for (let internal of this.internals) {
    //         const line = document.createElement("li");
    //         line.innerHTML = `<p>${internal}</p>`;
    //         line.ondblclick = DblclickToRemove;
    //         internalsUl.appendChild(line);
    //     }
    //     // update des constants
    //     const constantsUl = document.getElementsByClassName("mainModule__constants")[0].getElementsByTagName("ul")[0];
    //     constantsUl.innerHTML="";
    //     for (let constant of this.constants) {
    //         const line = document.createElement("li");
    //         line.innerHTML = `<p>${constant}</p>`;
    //         line.ondblclick = DblclickToRemove;
    //         constantsUl.appendChild(line);
    //     }
    // }

    // hideModule = (event) => {
    //     document.getElementsByClassName("mainModule")[0].style.opacity = "0%";
    //     setTimeout(()=>{
    //         document.getElementsByClassName("mainModule")[0].setAttribute("class","mainModule--undisplayed");
    //         document.getElementsByTagName("canvas")[0].style.opacity ="1";
    //     },500);
    // }
    // // méthode à binder au double clic sur un paramètre : supprime l'élément visuellement et de la liste de la variable associée
    // DblclickToRemove = (event,variableType) => {
    //     switch (variableType) {
    //         case (inputs) :
    //             for (let input of this.inputs) {
    //                 if 
    //             }    
    //         this.inputs.
    //     }
        
    //     event.target.parentElement.remove();
    // }
}





export {Variable,ModuleExtended};