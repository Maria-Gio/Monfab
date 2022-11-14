
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");

window.onload = createTable;

function introSubmit(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchForm.submit();
    }
}
const JSon = [{
    "name": "Motor trivolution",
    "descript": "des1",
    "id_num": "109235-X2",
    "status": true,
    "priority": "High"
}, {
    "name": "Motor protolution",
    "descript": "des2",
    "id_num": "109235-X2",
    "status": true,
    "priority": "High"
}, {
    "name": "Motor putalution",
    "descript": "des3",
    "id_num": "109235-X2",
    "status": true,
    "priority": "High"
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
            <td><button id="${i}"onclick="deleteRow(this)">Borrar</button ><button id="${i}"onclick="modifyRow(this)">Borrar</button ></td>`
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
function modifyRow(button) {
    let buttonId = button.id;
    let tableBody = document.querySelector('#tableBody');
    let myTr = tableBody.querySelectorAll('tr')
    for (let fila of myTr) {
        //fila.contentEditable =true;
        if (fila.id == ("fila" + buttonId)) {
            let myTd = fila.querySelectorAll('td')
            for (let i = 1; i <= myTd.length - 1; i++) {
                console.log(myTd[i].contentEditable = true)
            }
        }

    }
}
function saveRow(){
    //TODO
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







