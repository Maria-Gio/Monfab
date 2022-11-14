
/**Mirar de hacer en un nav.html e insertarlo con un fetch */
/*En nav.js debemos poner el metodo insertador*/ 
let html = `<h3>Directorio</h3>
            <ul>
                <div  class="li-wrapper">
                    <li>
                        <a  href="pruebajavascript.html">Home</a>
                    </li>
                </div>
                <div class="li-wrapper">
                    <li>
                        <a href="pagina2.html">Tabla</a>
                    </li>
                </div>
                <div class="li-wrapper">
                    <li>
                        <a href="pagina3.html">Galería</a>
                    </li>
                </div>
                <div class="li-wrapper">
                    <li>
                        <a href="pagina4.html">Sobre nosotros</a>
                    </li>
                </div>
                <div class="li-wrapper">
                    <li>
                        <a href="pagina5.html">Localización</a>
                    </li>
                </div>
            </ul>`

const divLinks = document.querySelector('#links');
let enlace=window.location.href;
divLinks.innerHTML=html;
let as=divLinks.querySelectorAll('a');
for(let a of as){
    console.log(a.href)
    console.log(enlace)
    if(a.href==enlace){
        console.log('ok')
    }else{
        console.log('no')
    }
}
