function generateTable() {
    var size = parseInt(document.getElementById("size").value);
    size = normalizeSize(size);
    var table = fillTableWithMinusOne(size);
    fillTableWithBinaries(table);
    displayTable(table);
}

function normalizeSize(size) {
    if (size < 6) {
        size = 6; // Minimum size
    }
    if ((size % 2) === 1) {
        size += 1; // Ensure size is even
    }
    return size;
}

function fillTableWithMinusOne(size) {
    var table = [];
    for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++) {
            row.push(-1);
        }
        table.push(row);
    }
    return table;
}

function randomBinary() {
    return Math.random() < 0.5 ? 0 : 1; // Retourne 0 ou 1 aléatoirement
}

function isDoubled(binary1, binary2) {
    return (binary1 === 0 && binary2 === 0) || (binary1 === 1 && binary2 === 1);
}

function inverseBinary(binary) {
    return binary === 0 ? 1 : 0;
}

function fillTableWithBinaries(table){
    table[0][0] = randomBinary();
    table[0][1] = randomBinary();
    table[1][0] = randomBinary();
    table[1][1] = randomBinary();
    var randomBinaries = [[0,0],[0,1],[1,0],[1,1]];
    while (!isTableFull(table)) {
        fillTableUntilNotSolvable(table,randomBinaries);
        cleanUnsolvableTable(table,randomBinaries);
    }

}
function isTableFull(table) {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (table[i][j] === -1) {
                return false;
            }
        }
    }
    return true;
}

function fillTableUntilNotSolvable(table,randomBinaries) {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (table[i][j] === -1) {
                if (i>1 && j>1) {
                var binary1 = table[i][j-2];
                var binary2 = table[i][j-1];
                var binary3 = table[i-1][j];
                var binary4 = table[i-2][j];
                if ((isDoubled(binary1, binary2) && isDoubled(binary3, binary4) && binary1 === binary3) || (isDoubled(binary1, binary2) && !isDoubled(binary3, binary4)) ) {
                    table[i][j] = inverseBinary(binary1);
                } else if (!isDoubled(binary1, binary2) && isDoubled(binary3, binary4)) {
                    table[i][j] = inverseBinary(binary3);
                }
                else if (!isDoubled(binary1, binary2) && !isDoubled(binary3, binary4)) {
                    table[i][j] = randomBinary();
                    randomBinaries.push([i,j]);
                } else {
                    return randomBinaries;
                }
            }
            else if (i>1) {
                var binary3 = table[i-1][j];
                var binary4 = table[i-2][j];
                if (isDoubled(binary3, binary4)) {
                    table[i][j] = inverseBinary(binary3);
                } else {
                    table[i][j] = randomBinary();
                    randomBinaries.push([i,j]);
                }
            }
            else if (j>1) {
                var binary1 = table[i][j-2];
                var binary2 = table[i][j-1];
                if (isDoubled(binary1, binary2)) {
                    table[i][j] = inverseBinary(binary1);
                } else {
                    table[i][j] = randomBinary();
                    randomBinaries.push([i,j]);
                }
            }
            
        }
    }
}
    return true;
}

function cleanUnsolvableTable(table,randomBinaries) {
    var lastRandomBinary = randomBinaries.pop();
    table[lastRandomBinary[0]][lastRandomBinary[1]] = inverseBinary(table[lastRandomBinary[0]][lastRandomBinary[1]]);
    for (var i=lastRandomBinary[0]; i < table.length; i++) {
        for (var j=0; j < table[i].length; j++) {
            if (i === lastRandomBinary[0] && j > lastRandomBinary[1]) {
                table[i][j] = -1;
            }
            else if (i > lastRandomBinary[0]) {
                table[i][j] = -1;
            }
        }
    }
}


function displayTable(table) {
     // Création du tableau HTML
     var tableElement = document.createElement("table");
     tableElement.style.border = "1px solid black";
     tableElement.style.borderCollapse = "collapse";
 
     for (var i = 0; i < table.length; i++) {
         var tr = document.createElement("tr");
         for (var j = 0; j < table[i].length; j++) {
             var td = document.createElement("td");
             td.style.border = "1px solid black";
             //td.style.padding = "5px";
             td.style.width = "30px";
             td.style.height = "30px";
             td.style.textAlign = "center";
             td.textContent = table[i][j]; // Ajoute la valeur 0 dans chaque cellule
             tr.appendChild(td);
         }
         tr.style.padding = "5px";
         tableElement.appendChild(tr);
     }
 
     // Ajout du tableau au DOM
     var container = document.getElementById("tableContainer");
     container.innerHTML = ""; // Efface le contenu précédent
     container.appendChild(tableElement);
}