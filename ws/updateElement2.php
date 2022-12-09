<?php
require_once "models/Element.php";
$id = "";
$elemento = null;
$datosElem = null;
$respuesta = null;
$id = $_GET['id'] ?? null;
if ($id != null) {
    $prueba = Element::getElement($id);
}
if (Element::getElement($id)) {
    $elemento = Element::fillElement(Element::getElement($id)[0]);
}
if ($elemento != null) {
    try {
        $datosElem = $elemento->setDatosNuevos();
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
if ($datosElem != null) {
    $respuesta = Element::guardar(null, $id, $datosElem[0], $datosElem[1]);
}


if ($respuesta && $respuesta != null) {
    echo Element::message(true, "Objeto modificado con exito", $respuesta);
} else {
    echo Element::message(false, "Objeto no modificado", null);
}