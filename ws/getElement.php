<?php
require_once "models/Element.php";


$id = $_GET['id'] ?? null;
try {
    $respuesta = Element::getElement($id);
} catch (Exception $e) {
    echo $e->getMessage();
}
if ($respuesta) {
    echo Element::message(true, "Objeto encontrado", $respuesta);
} else {
    echo Element::message(false, "Objeto no encontrado", null);
}