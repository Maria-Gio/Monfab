
const formulario = document.querySelector('#form');
formulario.addEventListener('submit', function (submit) {
    submit.preventDefault();
});
function sendFormData() {
    let formData = new FormData(formulario);
    Swal.fire({
        title: 'Quieres crear el elemento?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: 'Cancelar',
        denyButtonColor: '#d33',
        confirmButtonText: 'Crear'
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`./ws/createElement2bueno.php`, {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((resultado) => {
                    if (resultado.success == true) {
                        Swal.fire({
                            color: 'white',
                            title: 'Hecho!',
                            text: `Elemento: '${resultado.data.nombre}'  , ${resultado.message}`,
                            icon: 'success'
                        }
                        )
                    } else {
                        Swal.fire({
                            color: 'white',
                            title: 'Algo ha ido mal',
                            text: `${resultado.message}`,
                            icon: 'warning'
                        }
                        )
                    }
                })
                .then(formulario.reset())
                .catch(err => console.log(err));


        } else if (result.isDenied) {

            Swal.fire('El elemento no se ha creado', '', 'info');
            formulario.reset();
        }
    })

}