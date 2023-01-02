import { modulesToImport } from "../repertory.js";
import * as frames from "../frames.js";
// Ensemble des modules importés sur l'espace de travail
let modulesLinked = [];
let links = [];


// Fonction qui calcule la face du module la plus proche en fonction de la position (posX, posY) de la souris.
// Elle renvoie le côté le plus proche ainsi que les coordonnées du point d'attache au module.
// On a également en paramètres les dimensions de l'image du module.
function getNearestSide(posX,posY) {
    for (let child of paper.project.activeLayer.children) {
        if (child.name.includes("mainModule")) {
            console.log("ok");
            const heightMainModule = 200;
            const widthMainModule = 300;
            const mainModuleX = child.position["x"]-widthMainModule/2;
            const mainModuleY = child.position["y"]-heightMainModule/2;

            
            // Si posX est le minimum des 4 distances aux côtés du module, alors on retourne le côté "W" comme côté le plus proche
            // et on donne les coordonnées du point de contact à l'image du module.
            if ((posX-mainModuleX) == Math.min((posX-mainModuleX),(posY-mainModuleY),heightMainModule-(posY-mainModuleY),widthMainModule-(posX-mainModuleX))) {
                // console.log("ok2");
                return ["W",[mainModuleX,posY]];
            }
            // de même pour posY, heightMainModule-posY et widthMainModule-posX
            else if ((posY-mainModuleY) == Math.min((posX-mainModuleX),(posY-mainModuleY),heightMainModule-(posY-mainModuleY),widthMainModule-(posX-mainModuleX))) {
                // console.log("ok3");
                return ["N",[posX,mainModuleY]];
            }
            else if (widthMainModule-(posX-mainModuleX) == Math.min((posX-mainModuleX),(posY-mainModuleY),heightMainModule-(posY-mainModuleY),widthMainModule-(posX-mainModuleX))) {
                // console.log("ok4");
                return ["E",[widthMainModule+mainModuleX,posY]];
            }
            else if (heightMainModule-(posY-mainModuleY) == Math.min((posX-mainModuleX),(posY-mainModuleY),heightMainModule-(posY-mainModuleY),widthMainModule-(posX-mainModuleX))) {
                // console.log("ok5");
                return ["S",[posX,heightMainModule+mainModuleY]];
            }
        }
    } 
    
       
}



class Link {
    // coord0 corresponds aux coordonnées de départ de la flèche
    // coord1 corresponds aux coordonnées d'arrivée de la flèche
    // nodeType corresponds au type de node à laquelle est connectée la flèche --> nodeN, nodeE, nodeS ou nodeW
    // direction corresponds au sens de la flèche (in pour node-->module et out pour module-->node)
    // moduleSide corresponds au côté du module par lequel part la flèche ou par lequel elle arrive
    // blueprintDiv est le div dans lequel est dessiné le module
    // imgs contient les images qui dessinent la flèche
    // moduleId corresponds au nom du module auquel est lié le lien 
    // dotSize correspond à la taille en pixel du point dans le svg dot.svg
    // posBlueprint corresponds à la position du blueprint dans l'espace "body"

    constructor(coord0=[0,0],coord1=[0,0],nodeType="nodeN",direction="in",moduleSide="W",blueprintDiv=null,moduleId="") {
        this.coord0 = coord0;
        this.coord1 = coord1;
        this.nodeType = nodeType;
        this.direction = direction;
        this.moduleSide = moduleSide;
        this.blueprintDiv = blueprintDiv;
        this.imgs = []
        this.moduleId = moduleId
        this.minline = 15;
        this.posBlueprint = []
    }
    
    // Fonction qui dessine la flèche sur le blueprintDiv
    displayArrow () {
        const minimumOffset = 20;
        // si la flèche va de la node au module : 
        if (this.direction == "in") {
            // si la node de départ est nodeN :
            if (this.nodeType=="nodeN") {
                // si la face d'arrivée est la face Ouest :
                if (this.moduleSide=="W") {
                    // si le point de départ + l'élément de ligne minimum est en dessous du point d'arrivée :
                    // if (this.coord0[1]-this.minline>this.coord1[1]) {
                    if (this.coord0[1]>this.coord1[1]) {
                        // création de la flèche :
                        this.arrow = new paper.Path();
                        this.arrow.strokeColor = "#1568f8";
                        this.arrow.strokeWidth = 5;
                        this.arrow.add(this.coord0);
                        // --------s'il y a la place de dessiner la flêche horizontale---------
                        if (Math.abs(this.coord1[0]-this.coord0[0])>minimumOffset) {
                            
                            this.arrow.add([this.coord0[0],this.coord1[1]]);
                            // --------si la tête est à droite de la flèche-------
                            if (this.coord1[0]>=this.coord0[0]) {
                                this.arrow.add([this.coord1[0]-minimumOffset,this.coord1[1]]);
                                // dessin de la tête de la flèche
                                this.arrow.add([this.coord1[0]-minimumOffset,this.coord1[1]-10]);
                                this.arrow.add(this.coord1[0]-8,this.coord1[1]);
                                this.arrow.add([this.coord1[0]-minimumOffset,this.coord1[1]+10]);
                                this.arrow.add([this.coord1[0]-minimumOffset,this.coord1[1]]);
                                this.arrow.name = `arrow ${this.moduleId}`
                                paper.view.draw();
                            }
                            // ---------si la tête est à gauche de la flèche-------
                            else {
                                this.arrow.add([this.coord1[0]+minimumOffset,this.coord1[1]]);
                                // dessin de la tête de la flèche
                                this.arrow.add([this.coord1[0]+minimumOffset,this.coord1[1]-10]);
                                this.arrow.add(this.coord1[0]+8,this.coord1[1]);
                                this.arrow.add([this.coord1[0]+minimumOffset,this.coord1[1]+10]);
                                this.arrow.add([this.coord1[0]+minimumOffset,this.coord1[1]]);
                                this.arrow.name = `arrow ${this.moduleId}`
                                paper.view.draw();
                            }
                        }

                        // ------s'il n'y a pas la place de dessiner la flèche horizontale------
                        else {
                            this.arrow.add([this.coord0[0],this.coord1[1]+minimumOffset]);
                            // dessin de la tête de la flèche
                            this.arrow.add([this.coord0[0]-10,this.coord1[1]+minimumOffset]);
                            this.arrow.add(this.coord0[0],this.coord1[1]+8);
                            this.arrow.add([this.coord0[0]+10,this.coord1[1]+minimumOffset]);
                            this.arrow.add([this.coord0[0],this.coord1[1]+minimumOffset]);
                            this.arrow.name = `arrow ${this.moduleId}`
                            paper.view.draw();
                        }

                    }
                }
            }
        }
    }
    
    // Fonction qui détruit la flèche
    
    destroyArrow = function() {
        if (this.arrow) {
            this.arrow.remove();
        }
    }
    
    // Fonction qui met à jour la flèche (à relier au mouvement de la souris)
    updateDisplay = (event) => {
        this.coord1 = [event.layerX,event.layerY];
        this.destroyArrow();
        this.displayArrow();
    }

    // fonction à binder au clic sur le module lorsque l'on est en mode dessin de flèche
    endArrow  = (event) => {
            this.destroyArrow();
            console.log(event.point);
            this.coord1 = getNearestSide(event.point["x"],event.point["y"])[1];
            this.moduleSide = getNearestSide(event.point["x"],event.point["y"])[0];
            console.log(this.coord1,this.moduleSide);
            this.displayArrow();
            for (let child of paper.project.activeLayer.children) {
                if (child.name.includes("mainModule")) {
                    child.onClick = null;
                }
            }
            document.getElementById("blueprint").onclick = null;
            document.getElementById("blueprint").onmousemove = null;
       
    }

    // fonction qui dessine une flèche connaissant le point de départ et le point d'arrivée
    drawArrow () {
        const minSizeLine = 10;
        const arrowLength = 20;
        const arrowWidth = 20;
        switch (this.nodeType) {
            case "nodeN" : 
                switch (this.moduleSide) {
                    case "W" :
                        // si le point d'arrivée de la flèche est au dessus du premier élément de ligne vertical minimum
                        if (this.coord1[1]<(this.coord0[1]-minSizeLine)) {
                            const arrow = document.createElement("img");
                            arrow.src = "./icons/empty.svg";
                            
                            
                            
                            // console.log("ok");
                            // // création de l'élément de ligne vertical
                            // const line1 = document.createElement("img");
                            // line1.src = "./icons/dot.svg";
                            // line1.style.position = "absolute";
                            // line1.style.top = `${this.coord0[1]}px`;
                            // line1.style.left = `${this.coord0[0]}px`;
                            // line1.style.transform = `translateY(${(this.coord1[1]-this.coord0[1])/2}px) scaleY(${(this.coord1[1]-this.coord0[1])/this.dotSize})`;
                            // this.blueprintDiv.appendChild(line1);
                            // this.imgs.push(line1);
                            // // création de l'élément de ligne horizontal
                            // const line2 = document.createElement("img");
                            // line2.src = "./icons/dot.svg";
                            // line2.style.position = "absolute";
                            // line2.style.top = `${this.coord1[1]}px`;
                            // line2.style.left = `${this.coord0[0]-this.dotSize/2}px`;
                            // line2.style.transform = `translateX(${(this.coord1[0]-this.coord0[0])/2}px) scaleX(${(this.coord1[0]-this.coord0[0])/this.dotSize})`;
                            // this.blueprintDiv.appendChild(line2);
                            // this.imgs.push(line2);
                            // // création de la pointe de flèche 
                            // const arrow = document.createElement("img");
                            // arrow.src = "./icons/arrowRightSimple.svg";
                            // arrow.style.position = "absolute";
                            // // arrow.style.display =
                            // arrow.style.width = `${arrowLength}px`;
                            // arrow.style.height = `${arrowWidth}px`;
                            // arrow.style.top = `${this.coord1[1]-arrowWidth/2+this.dotSize/2}px`
                            // arrow.style.left = `${this.coord1[0]-arrowLength}px`
                            // this.blueprintDiv.appendChild(arrow);
                            // this.imgs.push(arrow);
                            
                        }

                        
                    }
        }
        // ajout des classes aux éléments de dessin de la flèche
        for (let element of this.imgs) {
            element.className = `link ${this.moduleId}`;
        }
    }
}

// -------------------Point Algorithme-------------------------
// Lors d'un clic sur une node, on crée une instance Link et on commence le dessin de la flèche, celle-ci se met à jour 
// à chaque déplacement de la souris et on finit la flêche lorsque l'on clique quelquepart sur le module.
// On calcul où se situe la face la plus proche et on trace la flèche en conséquence.
// ------------------------------------------------------------



// Fonction à relier au clic sur une node 
function toBindNodeClic(event) {
    for (let module of modulesLinked) {
        if (event.target.name.includes(module.name) ) {
            // console.log("ok");
            if (event.target.name.includes("nodeN")) {
                // console.log("ok2");
                // const newLink = new Link([event.target.x,event.target.y],[event.target.x,event.target.y],"nodeN","in","W",document.getElementsByClassName("blueprint")[0],module.name)
                const newLink = new Link([event.target.position["x"],event.target.position["y"]],[event.target.position["x"],event.target.position["y"]],"nodeN","in","W",document.getElementsByClassName("blueprint")[0],module.name)
                links.push(newLink);
                // console.log(`coord0 : ${event.target.position}`);
                newLink.displayArrow();
                document.getElementById("blueprint").onmousemove = newLink.updateDisplay;
                // console.log(links);
                // bind du clic sur le module
                for (let child of paper.project.activeLayer.children) {
                    if (child.name.includes("mainModule")){
                        child.onClick = newLink.endArrow;
                    }
                }
                // document.getElementById("blueprint").onclick = newLink.endArrow; 
            }
        }
        
    }
}



function clickOnBlueprint (event) {
    console.log(event);
}

// fonction à binder en cas de double click sur le module principal : affichage d'un div permettant le paramétrage du module principal
function bindingDClick (event) {
    // si l'élément doubleclické est le module principal
    if (event.target.name.includes("mainModule")) {
        // en cas d'édition d'un module existant
        for (let module of modulesToImport) {
            if (event.target.name.includes(module.name)) {
                const newModuleFrame = new frames.Frame("module",module);
                // module.displayModule();
                newModuleFrame.display();
                frames.frames.push(newModuleFrame);
            }
        }
    }
}



export {Link, clickOnBlueprint, toBindNodeClic,modulesLinked,links,bindingDClick};