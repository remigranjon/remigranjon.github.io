// Ensemble des modules importés sur l'espace de travail
let modulesLinked = [];
let links = [];




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
        this.dotSize = 5;
        this.posBlueprint = []
    }
    
    // Fonction qui dessine la flèche sur le blueprintDiv
    displayArrow () {
        // si la flèche va de la node au module :
        if (this.direction == "in") {
            // si le point de départ est en dessous du point d'arrivée :
            if (this.coord0[1]>this.coord1[1]) {
                // si la node de départ est nodeN :
                if (this.nodeType=="nodeN") {
                    // si la face d'arrivée est la face Ouest :
                    if (this.moduleSide=="W") {
                        // création du premier élément de ligne
                        const line1 = document.createElement("img");
                        line1.src = "./icons/dot.svg";
                        line1.style.position = "absolute";
                        line1.style.top=`${this.coord0[1]}px`;
                        line1.style.left=`${this.coord0[0]}px`;
                        line1.style.transform = `translateY(${(this.coord1[1]-this.coord0[1])/2}px) scaleY(${(this.coord0[1]-this.coord1[1])/this.dotSize}) `;
                        this.blueprintDiv.appendChild(line1);
                        this.imgs.push(line1);
                        // création du second élément de ligne
                        const line2 = document.createElement("img");
                        line2.src = "./icons/dot.svg";
                        line2.style.position = "absolute";
                        line2.style.top = `${this.coord1[1]}px`;
                        line2.style.left = `${this.coord0[0]}px`;
                        line2.style.transform = `translateX(${(this.coord1[0]-this.coord0[0])/2-this.dotSize/2}px) scaleX(${(this.coord1[0]-this.coord0[0]-5)/this.dotSize})`;
                        this.blueprintDiv.appendChild(line2);
                        this.imgs.push(line2);
                    }
                }
            }
        }
        
    }
    
    // Fonction qui détruit la flèche
    destroyArrow = function() {
        for (let element of this.imgs) {
            element.remove();
        }
    }
    
    // Fonction qui met à jour la flèche (à relier au mouvement de la souris)
    updateDisplay = (event) => {
        this.coord1 = [event.clientX,event.clientY];
        this.destroyArrow();
        this.displayArrow();
    }

    // fonction à binder au clic sur le module lorsque l'on est en mode dessin de flèche
    endArrow  = (event) => {
        if (event.target.className.includes("mainModule")) {
            // console.log("ok");
            this.destroyArrow();
            this.coord1 = getNearestSide(event.clientX,event.clientY)[1];
            this.moduleSide = getNearestSide(event.clientX,event.clientY)[0];
            console.log(this.moduleSide);
            this.drawArrow();
            document.getElementsByClassName("blueprint")[0].onclick = clickOnBlueprint;
            document.getElementsByClassName("blueprint")[0].onmousemove = null;
        }
        

    }

    // fonction qui dessine une flèche connaissant le point de départ et le point d'arrivée
    drawArrow () {
        const minSizeLine = 10;
        const arrowLength = 10;
        const arrowWidth = 5;
        // console.log(`${self.nodeType} ${self.moduleSide}`);
        switch (this.nodeType) {
            case "nodeN" : 
                switch (this.moduleSide) {
                    case "W" :
                        console.log("ok");
                        // si le point d'arrivée de la flèche est au dessus du premier élément de ligne vertical minimum
                        if (this.coord1[1]<(this.coord0[1]-minSizeLine)) {
                            console.log("ok");
                            // création de l'élément de ligne vertical
                            const line1 = document.createElement("img");
                            line1.src = "./icons/dot.svg";
                            line1.style.position = "absolute";
                            line1.style.top = `${this.coord0[1]}px`;
                            line1.style.left = `${this.coord0[0]}px`;
                            line1.style.transform = `translateY(${(this.coord1[1]-this.coord0[1])/2}px) scaleY(${(this.coord1[1]-this.coord0[1])/this.dotSize})`;
                            this.blueprintDiv.appendChild(line1);
                            this.imgs.push(line1);
                            // création de l'élément de ligne horizontal
                            const line2 = document.createElement("img");
                            line2.src = "./icons/dot.svg";
                            line2.style.position = "absolute";
                            line2.style.top = `${this.coord1[1]}px`;
                            line2.style.left = `${this.coord0[0]-this.dotSize/2}px`;
                            line2.style.transform = `translateX(${(this.coord1[0]-this.coord0[0])/2}px) scaleX(${(this.coord1[0]-this.coord0[0])/this.dotSize})`;
                            this.blueprintDiv.appendChild(line2);
                            this.imgs.push(line2);
                            // création de la pointe de flèche 
                            const arrow = document.createElement("img");
                            arrow.src = "./icons/arrowRightSimple.svg";
                            arrow.style.position = "absolute";
                            // arrow.style.display =
                            arrow.style.width = `${arrowLength}px`;
                            arrow.style.height = `${arrowWidth}px`;
                            arrow.style.top = `${this.coord1[1]-arrowWidth/2}px`
                            arrow.style.left = `${this.coord1[0]-arrowLength}px`
                            this.blueprintDiv.appendChild(arrow);
                            this.imgs.push(arrow);

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
        if (event.target.className.includes(module.name) ) {
            if (event.target.className.includes("nodeN")) {
                const newLink = new Link([event.target.x,event.target.y],[event.target.x,event.target.y],"nodeN","in","W",document.getElementsByClassName("blueprint")[0],module.name)
                links.push(newLink);
                newLink.displayArrow();
                document.getElementsByClassName("blueprint")[0].onmousemove = newLink.updateDisplay;
                console.log(links);
                // bind du clic sur le module
                document.getElementsByClassName("blueprint")[0].onclick = newLink.endArrow; 
            }
        }

    }
}


// Fonction qui calcule la face du module la plus proche en fonction de la position (posX, posY) de la souris.
// Elle renvoie le côté le plus proche ainsi que les coordonnées du point d'attache au module.
// On a également en paramètres les dimensions de l'image du module.
function getNearestSide(posX,posY){
    const heightModule = 149.05;
    const widthModule = 200;
    const modulePosX = 600;
    const modulePosY = 250;
    
    // Si posX est le minimum des 4 distances aux côtés du module, alors on retourne le côté "W" comme côté le plus proche
    // et on donne les coordonnées du point de contact à l'image du module.
    if ((posX-modulePosX) == Math.min((posX-modulePosX),(posY-modulePosY),heightModule-(posY-modulePosY),widthModule-(posX-modulePosX))) {
        return ["W",[modulePosX,posY]];
    }
    // de même pour posY, heightModule-posY et widthModule-posX
    else if ((posY-modulePosY) == Math.min((posX-modulePosX),(posY-modulePosY),heightModule-(posY-modulePosY),widthModule-(posX-modulePosX))) {
        return ["N",[posX,modulePosY]];
    }
    else if (widthModule-(posX-modulePosX) == Math.min((posX-modulePosX),(posY-modulePosY),heightModule-(posY-modulePosY),widthModule-(posX-modulePosX))) {
        return ["E",[widthModule+modulePosX,posY]];
    }
    else if (heightModule-(posY-modulePosY) == Math.min((posX-modulePosX),(posY-modulePosY),heightModule-(posY-modulePosY),widthModule-(posX-modulePosX))) {
        return ["S",[posX,heightModule+modulePosY]];
    }
       
}

function clickOnBlueprint (event) {
    console.log(event);
}





export {Link, clickOnBlueprint, toBindNodeClic,modulesLinked,links};