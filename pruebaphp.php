<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    require_once "./GestionBD.php";
    require_once "./ConexionW.php";
    require_once "./getElement.php";


    $direccion = '127.0.0.1';
    $usuario = 'root';
    $password = '';
    $baseDeDatos = 'monfab';
    $port = '3306';

    $bd = new GestionBD($usuario, $password, $direccion, $port, $baseDeDatos);
    var_dump($bd);
    $pdo = $bd->getPDO();
    

    ?>


</body>

</html>