<?php
require "ConexionW.php";

class GestionBD extends ConexionW
{
    public static $pdo;
    public function __construct($user, $password, $host, $port, $name)
    {

        parent::__construct($user, $password, $host, $port, $name);
        try {
            $dsn = 'mysql:host=' . $this->host . ';port=' . $this->port . ';dbname=' . $this->name;
            self::$pdo = new PDO($dsn, $this->user, $this->password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        } catch (PDOException $e) {
            throw new Exception('El xampp esta apagao');
        }

    }
    public function getPDO()
    {
        return self::$pdo;
    }

    public static function closePDO()
    {
        self::$pdo = null;

    }


    function ejecutaConsulta($pdo, $consultaAEjecutar, $id)
    {

        try {
            if ($id != null) {
                $consulta = $pdo->prepare($consultaAEjecutar);
                $consulta->bindParam(':param', $id, PDO::PARAM_INT);
                $consulta->execute();

                $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            } else {
                try {
                    $consulta = $pdo->query($consultaAEjecutar);
                    $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
                } catch (PDOException $e) {
                    return null;
                }
            }
            //el if de la muerte
            //empty() para validar que no esté vacio
            if (!isset($resultados) && $resultados == '' && $resultados == array()) {
                $resultados = null;

            } else {
                return $resultados;
            }


        } catch (PDOException $e) {
            throw new Exception('La query ta mal');
        }

    }
    function ejecutaConsulta2($pdo, $consultaAEjecutar, $id, $elem, $bindParams, $queryParams)
    {

        try {
            if ($elem != null) {
                $nombre = $elem->getName();
                $descripcion = $elem->getDescripcion();
                $nserie = $elem->getNserie();
                $status = $elem->getEstado();
                $prioridad = $elem->getPrioridad();
                $consulta = $pdo->prepare($consultaAEjecutar);
                $consulta->bindParam(':name', $nombre, PDO::PARAM_STR);
                $consulta->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
                $consulta->bindParam(':nserie', $nserie, PDO::PARAM_STR);
                $consulta->bindParam(':status', $status, PDO::PARAM_STR);
                $consulta->bindParam(':prioridad', $prioridad, PDO::PARAM_STR);
                $consulta->execute();
                $idRecuperado = $pdo->lastInsertId();
                $elementoRecuperado = Element::getElement($idRecuperado);
                if ($idRecuperado) {
                    $resultados = $elementoRecuperado;
                }
            } else {

                if ($queryParams != null && $bindParams != null && $id != null) {
                    $elemPreMod = Element::getElement($id);
                    $consulta = $pdo->prepare($consultaAEjecutar);
                    $consulta->bindParam(':id', $id, PDO::PARAM_STR);
                    $n = count($bindParams) - 1;
                    for ($i = 0; $i <= $n; $i++) {
                        ($consulta->bindParam(":$queryParams[$i]", $bindParams[$i], PDO::PARAM_STR));

                    }
                    $consulta->execute();
                    //
                    $resultados = $elementoMod = Element::getElement($id);



                }

            }



            if (!isset($resultados) && $resultados != null) {
                return null;
            } else {
                return $resultados;
            }


        } catch (PDOException $e) {
            throw new Exception('La query esta mal');
        }

    }
}