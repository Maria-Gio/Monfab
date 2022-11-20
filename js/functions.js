
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
    "estado": true,
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
    let tds = fila.querySelectorAll('td').values();

    let attributeTitle = [];
    for (let attrName in JSon[0]) {
        attributeTitle.push(attrName);
    }
    for (let td of tds) {
        let contenidotabla = td.innerText;
        if (contenidotabla != 'BorrarEditar') {
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', contenidotabla);
            input.className = "inputModify";
            td.innerText = "";
            td.appendChild(input);

        }

    }
    let tabla = document.querySelector("#tabla");
    let inputs = tabla.querySelectorAll('input');
    let contador = 0;
    for (let udInput of inputs) {

        udInput.setAttribute('id', attributeTitle[contador]);
        //if contador es boolean. cambiar tipo
        contador++;

    }

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
        console.log(editables[x]);
        inputsMod = editables[x].querySelectorAll('td');
        //Buscamos en los tds, el input y comprobamos que esta completo
        for (j = 1; j <= inputsMod.length - 1; j++) {
            let inputAComprobar = inputsMod[j].querySelector('input');
            if (inputAComprobar.value != "") {
                let idRef = inputAComprobar.id;
                JSon[id][idRef] = inputAComprobar.value;
            }
        }
        console.log(inputsMod);
        console.log(JSon[id]);
    }

    createTable();
}
let tabla = document.querySelector('table').addEventListener(
    'keydown', (event) => {
        // if not 'enter key' just exit here
        if (event.keyCode === 13) {
            saveChanges();
        }

    })











