
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");

window.onload = createTable();

function checkInput() {
    if (searchInput.value.length > 3) {

        filterTable();
    } else {
        createTable();
    }
}
function createTable() {
    fetch('./ws/getElement.php')
        .then(response => response.json()).then((JSON) => JSON.data).then((JSON) => {
            const tbody = document.querySelector("#tableBody");
            tbody.innerHTML = "";
            let text = "";
            for (i = 0; i < JSON.length; i++) {
                let tr1 = 0;
                while (tr1 < 1) {
                    let trWrite = `<tr id="${JSON[i].id}">
                <td class="buttonTd"><button id="${JSON[i].id}"onclick="deleteRow(${JSON[i].id})" class="tdButtons">Borrar</button ><button id="${JSON[i].id}"onclick="modifyRow(this)" class="tdButtons">Editar</button ></td>`
                    text += trWrite;
                    tr1++;
                    let tableRow = Object.entries(JSON[i]);
                    for (j = 1; j < tableRow.length; j++) {
                        let tdWrite = `<td >${tableRow[j][1]}</td>`;
                        text += tdWrite;
                    }

                }


            }
            let endWrite = `</tr >`
            text += endWrite;
            tbody.innerHTML = text;
        });


}



async function deleteRow(id) {

    Swal.fire({
        color: 'white',
        title: 'Quieres eliminar el elemento?',
        imageUrl: './css/img/cat.png',
        imageHeight: 250,
        imageAlt: 'Sad gato',
        text: 'No podras recuperar el elemento',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: `No eliminar`,

    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`./ws/deleteElement.php?id=${id} `, { method: 'DELETE' })
                .then((response) => response.json())
                .then((check) => {
                    if (check.success == true) {
                        Swal.fire({
                            color: 'white',
                            title: 'Hecho!',
                            text: `Elemento: '${check.data[0].nombre}' ${check.message}`,
                            icon: 'success'
                        }
                        )
                    } else {
                        Swal.fire({
                            color: 'white',
                            title: 'Algo ha ido mal',
                            text: `${check.message}`,
                            icon: 'error'
                        }
                        )
                    }
                })
                .then(createTable).catch(err => console.log(err));

        } else if (result.isDenied) {
            Swal.fire('El elemento no se ha eliminado', '', 'info')
        }
    })

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
    let fila = document.getElementById(id);

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
        case 'low':
            optionLow.selected = true;
            break;
        case 'medium':
            optionMedium.selected = true;
            break;
        case 'high':
            optionHigh.selected = true;
            break;
        default:
            optionLow.selected = true;
    }
    fila.cells[5].innerText = "";
    fila.cells[5].appendChild(select);

}
function saveChanges2() {
    let tabla = document.querySelector('#tableBody');
    let rows = tabla.querySelectorAll('tr');
    let editables = [];
    for (let row of rows) {
        if (row.className == "editable") {
            editables.push(row);
        }

    }
    for (let x = 0; x <= editables.length - 1; x++) {

        let id = editables[x].id;
        const formData = new FormData();
        //nombre
        if (editables[x].cells[1].childNodes[0].value != '') {
            formData.append('nombre', editables[x].cells[1].childNodes[0].value);
        }
        //descricion
        if (editables[x].cells[2].childNodes[0].value != '') {
            formData.append('descripcion', editables[x].cells[2].childNodes[0].value);
        }
        //nserie
        if (editables[x].cells[3].childNodes[0].value != '') {
            formData.append('nserie', editables[x].cells[3].childNodes[0].value);
        }
        //estado
        if (editables[x].cells[4].childNodes[0].checked === false || editables[x].cells[4].childNodes[0].checked === undefined) {
            formData.append('estado', false);
        } else {
            formData.append('estado', true);
        }
        //prioridad
        switch (editables[x].cells[5].childNodes[0].value) {
            case 'low': formData.append('prioridad', 'Low');
                break;
            case 'medium': formData.append('prioridad', 'Medium');
                break;
            case 'high': formData.append('prioridad', 'High');
                break;

        }
        Swal.fire({
            color: 'white',
            title: 'Quieres modificar el elemento?',
            text: "No podrás volver atrás.",
            icon: 'question',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            denyButtonText: 'No lo modifiques',
            denyButtonColor: '#d33',
            confirmButtonText: 'Si, modificalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`./ws/updateElement2.php?id=${id} `, {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => response.json())
                    .then((respuesta) => {
                        if (respuesta.success == true) {
                            Swal.fire({
                                color: 'white',
                                title: 'Hecho!',
                                text: `Elemento: '${respuesta.data[0].nombre}' ${respuesta.message}`,
                                icon: 'success'
                            }
                            )
                        } else {
                            Swal.fire({
                                color: 'white',
                                title: 'Algo ha ido mal',
                                text: `${respuesta.message}.`,
                                icon: 'error'
                            }
                            )
                        }
                    }).then(() => createTable())
                    .catch(err => console.log(err));

            } else if (result.isDenied) {
                createTable();
                Swal.fire('El elemento no se ha modificado', '', 'info')
            }
        })


    }


}

let tabla = document.querySelector('table').addEventListener(
    'keydown', (event) => {
        if (event.keyCode === 13) {
            saveChanges2();
        }

    })











