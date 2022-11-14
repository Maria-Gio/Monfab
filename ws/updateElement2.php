<?php
require_once "models/Element.php";
$id = "";
$elemento = null;

$id = $_GET['id'][0] ?? null;
$elemento = Element::fillElement(Element::getElement($id)[0]);
$datosElem = $elemento->setDatosNuevos();
$respuesta = Element::guardar(null, $id, $datosElem[0], $datosElem[1]);
var_dump($respuesta);

if ($respuesta && $respuesta != null) {
    echo Element::message(true, "Objeto modificado", $respuesta);
} else {
    echo Element::message(false, "Objeto no modificado", null);
}