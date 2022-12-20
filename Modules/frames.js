import * as mainModule from "./functions/mainModule.js";

class Frame {
    constructor (type,module=null) {
        this.type = type;
        this.module = module;
        this.parametersDivs = [];
    }
    display () {
        if (this.type=="module") {
            this.frame = document.createElement("div");
            this.frame.setAttribute("class","mainModule");
            // Ajout du div contenant le titre du module
            this.titleDiv = document.createElement("div");
            this.titleDiv.innerHTML=`<h2>${this.module.name}</h2>`;
            this.titleDiv.setAttribute("class","mainModule__title")
            this.frame.appendChild(this.titleDiv);
            document.body.appendChild(this.frame);
            // Ajout du div contenant les inputs
            createParameterDiv(this.frame,"input",this.module);
            // Ajout du div contenant les outputs
            createParameterDiv(this.frame,"output",this.module);
            // Ajout du div contenant les intrinsics
            createParameterDiv(this.frame,"intrinsic",this.module);
            // Ajout du div contenant les integrations
            createParameterDiv(this.frame,"integration",this.module);
            // Ajout du div contenant les constants
            createParameterDiv(this.frame,"constant",this.module);
            // Ajout du div contenant les internals
            createParameterDiv(this.frame,"internal",this.module);
            // changement de l'opacitée du frame après .5s
            setTimeout(()=>{
                this.frame.style.opacity = "100%";
            },200);
        }
    }
}

// fonction qui crée un div en fonction du type de paramètre
function createParameterDiv (frame,type,module) {
    console.log(type);
    // création du div 
    const div = document.createElement("div");
    // Allocation des classes au div en fonction du type de paramètre
    switch (type) {
        case ("input") :
            div.setAttribute("class","mainModule__inputs");
            break;
        case ("output"):
            div.setAttribute("class","mainModule__outputs");
            break;
        case ("intrinsic"):
            div.setAttribute("class","mainModule__intrinsics");
            break;
        case ("integration"):
            div.setAttribute("class","mainModule__integrations");
            break;
        case ("constant"):
            div.setAttribute("class","mainModule__constants");
            break;
        case ("internal"):
            div.setAttribute("class","mainModule__internals");
            break;

    }
    frame.appendChild(div);
    // création du titre et allocation en fonction du type de paramètre
    const div__title = document.createElement("h3");
    switch (type) {
        case ("input"):
            div__title.innerHTML="Inputs";
            break;
        case ("output"):
            div__title.innerHTML="Outputs";
            break;
        case ("intrinsic"):
            div__title.innerHTML="Intrinsics";
            break;
        case ("integration"):
            div__title.innerHTML="Integrations";
            break;
        case ("constant"):
            div__title.innerHTML="Constants";
            break;
        case ("internal"):
            div__title.innerHTML="Internals";
            break;
    };
    div.appendChild(div__title);
    // création de l'ul dans lequel sont listés les instances de paramètres
    const div__ul = document.createElement("ul");
    div.appendChild(div__ul);
    // création du div avec pour fonction l'ajout d'une nouvelle instance de paramètre
    const div__addDiv = document.createElement("div");
    div.appendChild(div__addDiv);
    const div__addDiv__input = document.createElement("input");
    div__addDiv__input.type="text";
    div__addDiv.appendChild(div__addDiv__input);
    const div__addDiv__button = document.createElement("button");
    div__addDiv__button.innerHTML = "Add";
    // Binding du bouton "Ajouter"
    div__addDiv__button.onclick = (event)=>{
        // Ajout d'une ligne à l'ul correspondants
        const line = document.createElement("li");
        div__ul.appendChild(line);
        // Ajout d'un <p> contenant le nom de l'input
        const paramName = div__addDiv__input.value;
        const paramText = document.createElement("p");
        paramText.innerHTML = paramName;
        line.appendChild(paramText);
        // Ajout d'un bouton "remove" permettant de supprimer l'input
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.onclick = (event) => {
            // suppression du paramètre de la liste du module en fonction du type de paramètre
            switch(type) {
                case ("input"):
                    for (let param of module.inputs) {
                        if (param.name == paramName) {
                            param = null;
                        } 
                    }
                    break;
                case ("output"):
                    for (let param of module.outputs) {
                        if (param.name == paramName) {
                            param = null;
                        } 
                    }
                    break;
                case ("intrinsic"):
                    for (let param of module.intrinsics) {
                        if (param.name == paramName) {
                            param = null;
                        } 
                    }
                    break;
                case ("integration"):
                    for (let param of module.integrations) {
                        if (param.name == paramName) {
                            param = null;
                        } 
                    }
                    break;
                case ("constant"):
                    for (let param of module.constants) {
                        if (param.name == paramName) {
                            param = null;
                        } 
                    }
                    break;
                case ("internal"):
                    for (let param of module.internals) {
                        if (param.name == paramName) {
                            param = null;
                        } 
                    }
                    break;
            }
            // suppression de la ligne affichée
            line.remove();
        }
        line.appendChild(removeButton);
        // Ajout d'un bouton "update" qui permet la modification des données de la variable
        const updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        line.appendChild(updateButton);
        // Ajout de la variable à la liste du module en fonction de son type
        switch (type) {
            case ("input") :
                module.inputs.push(new mainModule.Variable("input",paramName));
                break;
            case ("output") :
                module.outputs.push(new mainModule.Variable("input",paramName));
                break;
            case ("intrinsic") :
                module.intrinsics.push(new mainModule.Variable("input",paramName));
                break;
            case ("integration") :
                module.integrations.push(new mainModule.Variable("input",paramName));
                break;
            case ("constant") :
                module.constants.push(new mainModule.Variable("input",paramName));
                break;
            case ("internal") :
                module.internals.push(new mainModule.Variable("input",paramName));
                break;
        }
    }
    div__addDiv.appendChild(div__addDiv__button);
}

let frames = [];


export {frames,Frame};