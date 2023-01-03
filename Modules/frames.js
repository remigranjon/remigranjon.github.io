import * as mainModule from "./functions/mainModule.js";

class Frame {
    constructor (type,module=null,variable=null) {
        this.type = type;
        this.module = module;
        this.parametersDivs = [];
        this.variable = variable;
    }
    display () {
        if (this.type=="module") {
            document.getElementsByClassName("import")[0].style.opacity = "0%";
            this.frame = document.createElement("div");
            document.getElementsByClassName("frameContainer")[0].appendChild(this.frame);
            this.frame.setAttribute("class","mainModule");
            // Ajout du div contenant le titre du module
            this.titleDiv = document.createElement("div");
            this.titleDiv.innerHTML=`<h2>${this.module.name}</h2>`;
            this.titleDiv.setAttribute("class","mainModule__title")
            this.frame.appendChild(this.titleDiv);
            // Ajout du boutton qui retourne à l'écran principal
            this.returnButton = document.createElement("div");
            this.returnButton.innerHTML = "<img src='./icons/return-down-back.svg'>";
            this.returnButton.setAttribute("class","returnButton");
            this.returnButton.onclick = (event) => {
                document.getElementsByClassName("frameContainer")[0].removeChild(this.frame);
                document.getElementsByClassName("import")[0].style.opacity = "100%";
            }
            this.frame.appendChild(this.returnButton);
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
            // Update des divs en fonctions des paramètres du module
            updateParameterDivs(this.module);
            // changement de l'opacitée du frame après .5s
            setTimeout(()=>{
                document.getElementsByClassName("mainModule")[0].style.opacity = "100%";
            },200);
        }
        else if (this.type=="variable") {
            this.frame = document.createElement("div");
            this.frame.setAttribute("class","variableFrame");
            document.body.appendChild(this.frame);
            // Ajout du nom de la variable
            const variableName = document.createElement("p");
            variableName.innerHTML = this.variable.name;
            this.frame.appendChild(variableName);
            // ----Ajout du div contenant la description de la variable----
            const descriptionDiv = document.createElement("div");
            this.frame.appendChild(descriptionDiv);
            // Ajout du titre au div
            const descriptionDiv__title = document.createElement("p");
            descriptionDiv__title.innerHTML = "Description";
            descriptionDiv.appendChild(descriptionDiv__title);
            // Ajout du cadre de description de la variable
            const descriptionDiv__input = document.createElement("input");
            descriptionDiv__input.type = "text";
            descriptionDiv__input.value = this.variable.description;
            descriptionDiv.appendChild(descriptionDiv__input);
            // ----Ajout du div contenant l'unité de la variable----
            const unitDiv = document.createElement("div");
            this.frame.appendChild(unitDiv);
            // Ajout du titre au div
            const unitDiv__title = document.createElement("p");
            unitDiv__title.innerHTML = "Unit";
            unitDiv.appendChild(unitDiv__title);
            // Ajout du cadre de l'unité de la variable
            const unitDiv__input = document.createElement("input");
            unitDiv__input.type = "text";
            unitDiv__input.value = this.variable.unit;
            unitDiv.appendChild(unitDiv__input);
            // ----Ajout du div contenant la valeur conventionnelle de la variable----
            const convDiv = document.createElement("div");
            this.frame.appendChild(convDiv);
            // Ajout du titre au div
            const convDiv__title = document.createElement("p");
            convDiv__title.innerHTML = "Conventionnal Value";
            convDiv.appendChild(convDiv__title);
            // Ajout du cadre de la valeur conventionnelle de la variable
            const convDiv__input = document.createElement("input");
            convDiv__input.type = "text";
            convDiv__input.value = this.variable.conv;
            convDiv.appendChild(convDiv__input);
            // ----Ajout du bouton "valider"-----
            const validate = document.createElement("button");
            validate.innerHTML = "Validate";
            validate.onclick = (event)=>{
                this.variable.description = descriptionDiv__input.value;
                this.variable.unit = unitDiv__input.value;
                this.variable.conv = convDiv__input.value;
                document.body.removeChild(this.frame);
            }
            this.frame.appendChild(validate);
            this.frame.style.opacity = "100%";

        }
    }
}

// fonction qui renvoie l'ul correspondant au type spécifié
function getUl(type) {
    let ul = null;
    switch (type) {
        case ("input") :
            ul = document.getElementsByClassName("mainModule__inputs")[0].getElementsByTagName("ul")[0];
            break;
        case ("output") :
            ul = document.getElementsByClassName("mainModule__outputs")[0].getElementsByTagName("ul")[0];
            break;
        case ("intrinsic") :
            ul = document.getElementsByClassName("mainModule__intrinsics")[0].getElementsByTagName("ul")[0];
            break;
        case ("integration") :
            ul = document.getElementsByClassName("mainModule__integrations")[0].getElementsByTagName("ul")[0];
            break;
        case ("constant") :
            ul = document.getElementsByClassName("mainModule__constants")[0].getElementsByTagName("ul")[0];
            break;
        case ("internal") :
            ul = document.getElementsByClassName("mainModule__internals")[0].getElementsByTagName("ul")[0];
            break;

    }
    return ul;
}


// fonction qui ajoute une ligne en fonction du type de la variable dans l'ul spécifié
function createParameterLine (paramName,type,module) {
    const ul = getUl(type);
    const line = document.createElement("li");
    ul.appendChild(line);
    const paramText = document.createElement("p");
    paramText.innerHTML = paramName;
    line.appendChild(paramText);
    // Ajout d'un div contenant les boutons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class","paramLine__buttons");
    line.appendChild(buttonsContainer);
    // Ajout d'un bouton "remove" permettant de supprimer l'input
    const removeButton = document.createElement("div");
    removeButton.setAttribute('class','paramLine__remove');
    removeButton.innerHTML = "--";
    removeButton.onclick = (event) => {
        // suppression du paramètre de la liste du module en fonction du type de paramètre
        switch(type) {
            case ("input"):
                for (let i=0; i<module.inputs.length;i++) {
                    if (module.inputs[i].name == paramName) {
                        module.inputs.splice(i,1);
                    } 
                }
                break;
            case ("output"):
                for (let i=0; i<module.outputs.length;i++) {
                    if (module.outputs[i].name == paramName) {
                        module.outputs.splice(i,1);
                    } 
                }
                break;
            case ("intrinsic"):
                for (let i=0; i<module.intrinsics.length;i++) {
                    if (module.intrinsics[i].name == paramName) {
                        module.intrinsics.splice(i,1);
                    } 
                }
                break;
            case ("integration"):
                for (let i=0; i<module.integrations.length;i++) {
                    if (module.integrations[i].name == paramName) {
                        module.integrations.splice(i,1);
                    } 
                }
                break;
            case ("constant"):
                for (let i=0; i<module.constants.length;i++) {
                    if (module.constants[i].name == paramName) {
                        module.constants.splice(i,1);
                    } 
                }
                break;
            case ("internal"):
                for (let i=0; i<module.internals.length;i++) {
                    if (module.internals[i].name == paramName) {
                        module.internals.splice(i,1);
                    } 
                }
                break;
            
        }
        // suppression de la ligne affichée
        line.remove();
    }
    buttonsContainer.appendChild(removeButton);
    // Ajout d'un bouton "update" qui permet la modification des données de la variable
    const updateButton = document.createElement("div");
    updateButton.setAttribute("class","paramLine__update");
    updateButton.innerHTML = "<img src='./icons/update.svg'>";
    updateButton.onclick = (event)=>{
        for (let param of module[type+"s"]) {
            if (param.name==paramName) {
                const variableFrame = new Frame("variable",null,param);
                variableFrame.display();
            }
        }
    }
    buttonsContainer.appendChild(updateButton);


}

// fonction qui crée un div en fonction du type de paramètre
function createParameterDiv (frame,type,module) {
    // création du div 
    const div = document.createElement("div");
    // Allocation des classes au div en fonction du type de paramètre
    switch (type) {
        case ("input") :
            div.setAttribute("class","mainModule__inputs paramContainer");
            break;
        case ("output"):
            div.setAttribute("class","mainModule__outputs paramContainer");
            break;
        case ("intrinsic"):
            div.setAttribute("class","mainModule__intrinsics paramContainer");
            break;
        case ("integration"):
            div.setAttribute("class","mainModule__integrations paramContainer");
            break;
        case ("constant"):
            div.setAttribute("class","mainModule__constants paramContainer");
            break;
        case ("internal"):
            div.setAttribute("class","mainModule__internals paramContainer");
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
    div__addDiv.setAttribute("class","addVariable");
    div.appendChild(div__addDiv);
    const div__addDiv__input = document.createElement("input");
    div__addDiv__input.type="text";
    div__addDiv.appendChild(div__addDiv__input);
    const div__addDiv__button = document.createElement("div");
    div__addDiv__button.setAttribute('class','mainModule__add');
    div__addDiv__button.innerHTML = "+";
    // Binding du bouton "Ajouter"
    div__addDiv__button.onclick = (event)=>{
        const paramName = div__addDiv__input.value;
        createParameterLine(paramName,type,module)
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




// fonction qui détruit toutes les lignes dans les divs de paramètre. <!> à utiliser avec updateParameterDivs
function clearParameterDivs () {
    const types = ["input","output","intrinsic","integration","internal","constant"];
    for (let type of types) {
        const ul = getUl(type);
        ul.innerHTML = "";
    }
}

// fonction qui remplie les divs de paramètres avec les paramètres contenus daans le module spécifié
function fillParameterDivs(module) {
    const types = ["input","output","intrinsic","integration","internal","constant"];
    for (let type of types) {
        for (let parameter of module[type + "s"]) {
            createParameterLine(parameter.name,type,module);
        };
    };
};

// fonction qui supprime les lignes existants dans les divs de paramètres et qui ensuite les rempli 
// avec les paramètres existants au sein du module
function updateParameterDivs (module) {
    clearParameterDivs();
    fillParameterDivs(module);
};

let frames = [];


export {frames,Frame};