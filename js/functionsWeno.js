
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");

window.onload = createTable;


const JSon = [{
    "nombre": "Motor trivolution",
    "descripcion": "des1",
    "nserie": "109235-X2",
    "estado": true,
    "prioridad": "High"
}, {
    "nombre": "Motor protolution",
    "descripcion": "des2",
    "nserie": "109235-X2",
    "estado": false,
    "prioridad": "High"
}, {
    "nombre": "Motor putalution",
    "descripcion": "des3",
    "nserie": "109235-X2",
    "estado": true,
    "prioridad": "High"
}];
function checkInput() {
    if (searchInput.value.length > 3) {

        filterTable();
    } else {
        createTable();
    }
}
function createTable() {
    const tbody = document.querySelector("#tableBody");
    tbody.innerHTML = "";
    let text = "";
    for (i = 0; i < JSon.length; i++) {
        let tr1 = 0;
        while (tr1 < 1) {
            let trWrite = `<tr id="fila${i}">
            <td class="buttonTd"><button id="${i}"onclick="deleteRow(this)" class="tdButtons">Borrar</button ><button id="${i}"onclick="modifyRow(this)" class="tdButtons">Editar</button ></td>`
            text += trWrite;
            tr1++;

            let tableRow = Object.entries(JSon[i]);
            for (let attribute of tableRow) {
                let tdWrite = `<td >${attribute[1]}</td>`;
                text += tdWrite;
            }

        }


    }
    let endWrite = `</tr > `
    text += endWrite;
    tbody.innerHTML = text;
}

function deleteRow(button) {
    let id = button.id;
    document.querySelector("#fila" + id).remove();
}

function filterTable() {
    let text = searchInput.value.toLowerCase();
    let myTr = document.querySelectorAll("tr");

    if (text.length < 3) {
        return;
    }
    for (let tdAttribute of myTr) {
        let attrDescript = tdAttribute.children[2].innerText;
        let attrName = tdAttribute.children[1].innerText;

        if (attrDescript.toLowerCase().includes(text) || attrName.toLowerCase().includes(text)) {
            tdAttribute.style.backgroundColor = "#e30e0e6e"
        } else {
            tdAttribute.style.backgroundColor = "transparent";
        }
    }


}
function modifyRow(button) {
    let id = button.id;
    button.onclick = "";
    let fila = document.querySelector("#fila" + id);

    fila.className = "editable";
    let tds = fila.cells;


    //nombre
    let inputN = document.createElement('input');
    inputN.setAttribute('type', 'text');
    inputN.setAttribute('placeholder', fila.cells[1].innerText);
    inputN.className = "inputModify";
    inputN.setAttribute('id', 'nombre');
    fila.cells[1].innerText = "";
    fila.cells[1].appendChild(inputN);

    //descripcion
    let inputD = document.createElement('input');
    inputD.setAttribute('type', 'text');
    inputD.setAttribute('placeholder', fila.cells[2].innerText);
    inputD.className = "inputModify";
    inputD.setAttribute('id', 'descripcion');
    fila.cells[2].innerText = "";
    fila.cells[2].appendChild(inputD);

    //nserie
    let inputNs = document.createElement('input');
    inputNs.setAttribute('type', 'text');
    inputNs.setAttribute('placeholder', fila.cells[3].innerText);
    inputNs.className = "inputModify";
    inputNs.setAttribute('id', 'nserie');
    fila.cells[3].innerText = "";
    fila.cells[3].appendChild(inputNs);

    //Estado
    let inputEs = document.createElement('input');

    inputEs.setAttribute('type', 'checkbox');
    inputEs.setAttribute('id', 'estado');
    ////El label me daba problemas, me generaba otro td, ademas de no poder usar el id porque ya lo uso para tomar los datos en el metodo saveChanges

    // let labelInput = document.createElement('label');
    // labelInput.setAttribute('for', 'estado');
    if (fila.cells[4].innerText == 'true') {
        // labelInput.textContent = "Activo";
        inputEs.checked = true;
    } else {
        // labelInput.textContent = "Inactivo";
        inputEs.checked = false;
    }
    fila.cells[4].innerText = ""; //fila.cells[4].appendChild(labelInput);
    fila.cells[4].appendChild(inputEs);

    //prioridad
    let select = document.createElement("select");
    select.setAttribute('id', 'prioridad');

    let optionLow = document.createElement("option");
    optionLow.setAttribute("value", "low");
    let optionLowTexto = document.createTextNode("Low");
    optionLow.appendChild(optionLowTexto);

    let optionMedium = document.createElement("option");
    optionMedium.setAttribute("value", "medium");
    let optionMediumTexto = document.createTextNode("Medium");
    optionMedium.appendChild(optionMediumTexto);

    let optionHigh = document.createElement("option");
    optionHigh.setAttribute("value", "high");
    let optionHighTexto = document.createTextNode("High");
    optionHigh.appendChild(optionHighTexto);

    select.appendChild(optionLow);
    select.appendChild(optionMedium);
    select.appendChild(optionHigh);
    switch (fila.cells[5].innerText) {
        case 'Low':
            optionLow.selected = true;
            break;
        case 'Medium':
            optionMedium.selected = true;
            break;
        case 'High':
            optionHigh.selected = true;
            break;
        default:
            optionLow.selected = true;
    }
    fila.cells[5].innerText = "";
    fila.cells[5].appendChild(select);

}
function saveChanges() {
    let tabla = document.querySelector('#tableBody');
    let rows = tabla.querySelectorAll('tr');
    let editables = [];
    for (let row of rows) {
        if (row.className == "editable") {
            editables.push(row);
        }

    }

    let inputsMod = [];
    for (let x = 0; x <= editables.length - 1; x++) {

        let id = (editables[x].id);
        id = id.slice(-1);

        //nombre
        if (editables[x].cells[1].childNodes[0].value != '') {
            JSon[id][editables[x].cells[1].childNodes[0].id] = editables[x].cells[1].childNodes[0].value;
        }
        //descricion
        if (editables[x].cells[2].childNodes[0].value != '') {
            JSon[id][editables[x].cells[2].childNodes[0].id] = editables[x].cells[2].childNodes[0].value;
        }
        //nserie
        if (editables[x].cells[3].childNodes[0].value != '') {
            JSon[id][editables[x].cells[3].childNodes[0].id] = editables[x].cells[3].childNodes[0].value;
        }
        //estado
        if (editables[x].cells[4].childNodes[0].checked === false) {
            JSon[id][editables[x].cells[4].childNodes[0].id] = false;
        } else {
            JSon[id][editables[x].cells[4].childNodes[0].id] = true;

        }
        //prioridad
        switch (editables[x].cells[5].childNodes[0].value) {
            case 'low': JSon[id][editables[x].cells[5].childNodes[0].id] = 'Low';
                break;
            case 'medium': JSon[id][editables[x].cells[5].childNodes[0].id] = 'Medium';
                break;
            case 'high': JSon[id][editables[x].cells[5].childNodes[0].id] = 'High';
                break;

        }


    }
    createTable();
}

let tabla = document.querySelector('table').addEventListener(
    'keydown', (event) => {
        if (event.keyCode === 13) {
            saveChanges();
        }

    })











