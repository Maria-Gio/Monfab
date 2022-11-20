
/**Mirar de hacer en un nav.html e insertarlo con un fetch */
/*En nav.js debemos poner el metodo insertador*/
const divLinks = document.querySelector("#links");
window.onload = createLinks().then(result => {
    divLinks.innerHTML = result
});

let promise = new Promise(function (resolve) {
    resolve(createLinks())
}
).then(function (result) {

    selectedLink();

})


function createLinks() {

    return fetch("./nav.html")
        .then((result) => {
            return result.text();
        })
        .catch((error) => { console.log('No se ha podido obtener el codigo html', error); });


}
function selectedLink() {
    let as = divLinks.querySelectorAll('a');
    for (let a of as) {

        if (window.location.href.includes(a.href)) {

            a.parentElement.parentElement.className = "li-wrapper-selected";
        }// } else {
        //     console.log(a.href);
        //     console.log(window.location.href);
        // }
    }
}
