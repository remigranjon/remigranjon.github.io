import * as mainModule from "./functions/mainModule.js";

class Frame {
    constructor (type,module=null) {
        this.type = type;
        this.module = module;
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
            // ------------------------------------------------------
            // ----------Ajout du div contenant les inputs-----------
            // ------------------------------------------------------
            this.inputsDiv = document.createElement("div");
            this.inputsDiv.setAttribute("class","mainModule__inputs");
            this.frame.appendChild(this.inputsDiv);
            this.inputsDiv__title = document.createElement("h3");
            this.inputsDiv__title.innerHTML = "Inputs";
            this.inputsDiv.appendChild(this.inputsDiv__title);

            this.inputsDiv__ul = document.createElement("ul");
            this.inputsDiv.appendChild(this.inputsDiv__ul);

            this.inputsDiv__addDiv = document.createElement("div");
            this.inputsDiv.appendChild(this.inputsDiv__addDiv);
            this.inputsDiv__addDiv__input = document.createElement("input");
            this.inputsDiv__addDiv__input.type="text";
            this.inputsDiv__addDiv.appendChild(this.inputsDiv__addDiv__input);
            this.inputsDiv__addDiv__button = document.createElement("button");
            this.inputsDiv__addDiv__button.innerHTML = "Add";
            // Binding du bouton "Ajouter"
            this.inputsDiv__addDiv__button.onclick = (event)=>{
                // Ajout d'une ligne à l'ul correspondants
                const line = document.createElement("li");
                this.inputsDiv__ul.appendChild(line);
                // Ajout d'un <p> contenant le nom de l'input
                const inputName = this.inputsDiv__addDiv__input.value;
                const inputText = document.createElement("p");
                inputText.innerHTML = inputName;
                line.appendChild(inputText);
                // Ajout d'un bouton "remove" permettant de supprimer l'input
                const removeButton = document.createElement("button");
                removeButton.innerHTML = "Remove";
                removeButton.onclick = (event) => {
                    // suppression de l'input des inputs du module
                    for (let input of this.module.inputs) {
                        if (input.name == inputName) {
                            input = null;
                        } 
                    }
                    // suppression de la ligne affichée
                    line.remove();
                }
                line.appendChild(removeButton);
                // Ajout d'un bouton "update" qui permet la modification des données de la variable
                const updateButton = document.createElement("button");
                updateButton.innerHTML = "Update";
                line.appendChild(updateButton);
                // Ajout d'une variable de type "input" aux inputs du module
                this.module.inputs.push(new mainModule.Variable("input",inputName));
            }
            this.inputsDiv__addDiv.appendChild(this.inputsDiv__addDiv__button);
            document.body.appendChild(this.frame);
            // ------------------------------------------------------
            // ----------Ajout du div contenant les outputs-----------
            // ------------------------------------------------------
            this.outputsDiv = document.createElement("div");
            this.outputsDiv.setAttribute("class","mainModule__outputs");
            this.frame.appendChild(this.outputsDiv);
            this.outputsDiv__title = document.createElement("h3");
            this.outputsDiv__title.innerHTML = "Outputs";
            this.outputsDiv.appendChild(this.outputsDiv__title);

            this.outputsDiv__ul = document.createElement("ul");
            this.outputsDiv.appendChild(this.outputsDiv__ul);

            this.outputsDiv__addDiv = document.createElement("div");
            this.outputsDiv.appendChild(this.outputsDiv__addDiv);
            this.outputsDiv__addDiv__input = document.createElement("input");
            this.outputsDiv__addDiv__input.type="text";
            this.outputsDiv__addDiv.appendChild(this.outputsDiv__addDiv__input);
            this.outputsDiv__addDiv__button = document.createElement("button");
            this.outputsDiv__addDiv__button.innerHTML = "Add";
            // Binding du bouton "Ajouter"
            this.outputsDiv__addDiv__button.onclick = (event)=>{
                // Ajout d'une ligne à l'ul correspondants
                const line = document.createElement("li");
                this.outputsDiv__ul.appendChild(line);
                // Ajout d'un <p> contenant le nom de l'input
                const inputName = this.outputsDiv__addDiv__input.value;
                const inputText = document.createElement("p");
                inputText.innerHTML = inputName;
                line.appendChild(inputText);
                // Ajout d'un bouton "remove" permettant de supprimer l'input
                const removeButton = document.createElement("button");
                removeButton.innerHTML = "Remove";
                removeButton.onclick = (event) => {
                    // suppression de l'input des inputs du module
                    for (let output of this.module.outputs) {
                        if (output.name == inputName) {
                            output = null;
                        } 
                    }
                    // suppression de la ligne affichée
                    line.remove();
                }
                line.appendChild(removeButton);
                // Ajout d'un bouton "update" qui permet la modification des données de la variable
                const updateButton = document.createElement("button");
                updateButton.innerHTML = "Update";
                line.appendChild(updateButton);
                // Ajout d'une variable de type "input" aux inputs du module
                this.module.inputs.push(new mainModule.Variable("input",inputName));
            }
            this.outputsDiv__addDiv.appendChild(this.outputsDiv__addDiv__button);
            // changement de l'opacitée de la frame après .5s
            setTimeout(()=>{
                this.frame.style.opacity = "100%";
            },500);
        }
    }
}

let frames = [];


export {frames,Frame};