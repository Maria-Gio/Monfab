<?php
require "./ws/models/Element.php";

if (isset($_POST["name"]) && $_POST["name"] != "") {
    $usr_name = $_POST["name"];
} else {
    $usr_name = null;
}

if (isset($_POST["descript"]) && $_POST["descript"] != "") {
    $usr_p_descript = $_POST["descript"];
} else {
    $usr_p_descript = null;
}
if (isset($_POST["id_num"]) && $_POST["id_num"] != "") {
    $usr_id_num = $_POST["id_num"];
} else {
    $usr_id_num = null;
}
if (isset($_POST["status"]) && $_POST["status"] != "") {
    $usr_status = $_POST["status"];
} else {
    $usr_status = false;
}
if (isset($_POST["priority"]) && $_POST["priority"] != "") {
    switch ($_POST["priority"]) {
        case 'Low':
            $usr_priority = 'low';
            break;
        case 'Medium':
            $usr_priority = 'medium';
            break;
        case 'High':
            $usr_priority = 'high';
            break;
        default:
        $usr_priority = 'low';
    }
    //Verificar con un switch la opcion, que $_POST["priority"] solo pueda ser Alta, Media o Baja
} else {
    $usr_priority = "Baja";
}




$elemento = new Element($usr_name, $usr_p_descript, $usr_id_num, $usr_status, $usr_priority);
$elemento->writeJson($elemento, "elementos.txt");