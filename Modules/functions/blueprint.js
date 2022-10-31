class Link {
    // coord0 corresponds aux coordonnées de départ de la flèche
    // coord1 corresponds aux coordonnées d'arrivée de la flèche
    // nodeType corresponds au type de node à laquelle est connectée la flèche --> nodeN, nodeE, nodeS ou nodeW
    // direction corresponds au sens de la flèche (in pour node-->module et out pour module-->node)
    // moduleSide corresponds au côté du module par lequel part la flèche ou par lequel elle arrive

    constructor(coord0,coord1,nodeType,direction,moduleSide) {
        this.coord0 = coord0;
        this.coord1 = coord1;
        this.nodeType = nodeType;
        this.direction = direction;
        this.moduleSide = moduleSide;
    }

    // Fonction qui dessine la flèche sur le blueprintDiv
    display(blueprintDiv) {
        // si la flèche va de la node au module :
        if (this.direction == "in") {
            // si le point de départ est en dessous du point d'arrivée :
            if (coord0[0]>coord1[0]) {
                // si la node de départ est nodeN :
                if (nodeType=="nodeN") {
                    // si la face d'arrivée est la face Est :
                    if (moduleSide=="E") {
                        const line1 = document.createElement("img");
                        line1.src = "../../icons/verticalLine.svg";
                        line1.style.position = "absolute";
                        line1.style.transform = "rotate(180deg)";
                        line1.style.top=`${this.coord0[1]}px`;
                        line1.style.left=`${this.coord0[0]}px`;
                        
                    }
                }
            }
        }

    }
}