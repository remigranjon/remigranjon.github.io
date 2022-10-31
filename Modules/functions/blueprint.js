class Link {
    // coord0 corresponds aux coordonnées de départ de la flèche
    // coord1 corresponds aux coordonnées d'arrivée de la flèche
    // nodeType corresponds au type de node à laquelle est connectée la flèche --> nodeN, nodeE, nodeS ou nodeW
    // direction corresponds au sens de la flèche (in pour node-->module et out pour module-->node)
    // moduleSide corresponds au côté du module par lequel part la flèche ou par lequel elle arrive
    // blueprintDiv est le div dans lequel est dessiné le module
    // imgs contient les images qui dessinent la flèche

    constructor(coord0,coord1,nodeType,direction,moduleSide,blueprintDiv) {
        this.coord0 = coord0;
        this.coord1 = coord1;
        this.nodeType = nodeType;
        this.direction = direction;
        this.moduleSide = moduleSide;
        this.blueprintDiv = blueprintDiv;
        this.imgs = []
    }

    // Fonction qui dessine la flèche sur le blueprintDiv
    displayArrow() {
        // si la flèche va de la node au module :
        if (this.direction == "in") {
            // si le point de départ est en dessous du point d'arrivée :
            if (coord0[0]>coord1[0]) {
                // si la node de départ est nodeN :
                if (nodeType=="nodeN") {
                    // si la face d'arrivée est la face Ouest :
                    if (moduleSide=="W") {
                        const line1 = document.createElement("img");
                        line1.src = "./icons/verticalLine.svg";
                        line1.style.position = "absolute";
                        line1.style.transform = "rotate(180deg)";
                        line1.style.top=`${this.coord0[1]}px`;
                        line1.style.left=`${this.coord0[0]}px`;
                        line1.style.height = `${this.coord0[1]-this.coord1[1]}px`;
                        this.blueprintDiv.appendChild(line1);
                        this.imgs.push(line1);
                        
                    }
                }
            }
        }
    
    }

    // Fonction qui détruit la flèche
    destroyArrow() {
        for (let element of this.imgs) {
            element.remove();
        }
    }

    // Fonction qui met à jour la flèche (à relier au mouvement de la souris)
    updateDisplay(event) {
        this.coord1 = [event.clientX,event.clientY];
        this.destroyArrow();
        this.displayArrow();
    }
}

// -------------------Point Algorithme-------------------------
// Lors d'un clic sur une node, on crée une instance Link et on commence le dessin de la flèche, celle-ci se met à jour 
// à chaque déplacement de la souris et on finit la flêche lorsque l'on clique quelquepart sur le module.
// On calcul où se situe la face la plus proche et on trace la flèche en conséquence.
// ------------------------------------------------------------



// // Fonction à relier au clic sur une node 
// function toBindNodeClic(event) {
//     const link = new Link(event)
// }


// // Fonction qui  
// function bindNodeClic(links) {
//     const 
// }

// Fonction qui calcule la face du module la plus proche en fonction de la position (posX, posY) de la souris.
// Elle renvoie le côté le plus proche ainsi que les coordonnées du point d'attache au module.
// On a également en paramètres les dimensions de l'image du module.
function getNearestSide(posX,posY){
    const heightModule = 200;
    const widthModule = 200;
    
    // Si posX est le minimum des 4 distances aux côtés du module, alors on retourne le côté "W" comme côté le plus proche
    // et on donne les coordonnées du point de contact à l'image du module.
    if (posX == Math.min(posX,posY,heightModule-posY,widthModule-posX)) {
        return ["W",[0,posY]];
    }
    // de même pour posY, heightModule-posY et widthModule-posX
    else if (posY == Math.min(posX,posY,heightModule-posY,widthModule-posX)) {
        return ["N",[posX,0]];
    }
    else if (widthModule-posX == Math.min(posX,posY,heightModule-posY,widthModule-posX)) {
        return ["E",[widthModule,posY]];
    }
    else if (heightModule-posY == Math.min(posX,posY,heightModule-posY,widthModule-posX)) {
        return ["S",[posX,heightModule]];
    }
       
}

export {Link};