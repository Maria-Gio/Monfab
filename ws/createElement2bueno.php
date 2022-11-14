<?php
require_once "models/Element.php";
$elemento=null;
try {
    $elemento = Element::createElement();
    $respuesta = $elemento->guardar($elemento, null, null, null);
} catch (Exception $e) {
    echo $e->getMessage();
}



if (isset($respuesta)) {

    echo Element::message(true, "Objeto insertado correctamente", json_decode($elemento->toJson()));

} else {
    echo Element::message(false, "Objeto no insertado", null);

}