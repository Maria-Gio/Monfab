<?php
require_once "models/Element.php";

$id = $_GET['id'] ?? null;
$datosBorrado=null;
try {
    if (isset($id) && $id != null) {
        $datosBorrado = Element::deleteElement($id);
    } else {
        throw new Exception('no has pasado el id');
    }

} catch (Exception $e) {
    echo $e->getMessage();
}


if ($datosBorrado) {
    echo Element::message(true, "Objeto borrado correctamente", $datosBorrado);


} else {
    echo Element::message(false, "Objeto no borrado o no encontrado", null);

}