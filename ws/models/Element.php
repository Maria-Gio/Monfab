<?php

//use iToJsonPHP\IToJson;
require_once "../GestionBD.php";

class Element // implements IToJson

{
    private $name;
    private $descripcion;
    private $nserie;
    private $estado;
    private $prioridad;
    private static $bd;





    public function __construct($name, $descripcion, $nserie, $estado, $prioridad)
    {
        $this->name = $name;
        $this->descripcion = $descripcion;
        $this->nserie = $nserie;
        $this->estado = $estado;
        $this->prioridad = $prioridad;
    }



    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of description
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set the value of description
     *
     * @return  self
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get the value of nserie
     */
    public function getNserie()
    {
        return $this->nserie;
    }

    /**
     * Set the value of nserie
     *
     * @return  self
     */
    public function setNserie($nserie)
    {
        $this->nserie = $nserie;

        return $this;
    }

    /**
     * Get the value of estado
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set the value of estado
     *
     * @return  self
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }


    /**
     * Get the value of priority
     */
    public function getPrioridad()
    {
        return $this->prioridad;
    }

    /**
     * Set the value of priority
     *
     * @return  self
     */
    public function setPrioridad($prioridad)
    {
        $this->prioridad = $prioridad;

        return $this;
    }

    public function toJson()
    {
        if (is_object($this)) {
            $respuesta = json_encode(get_object_vars($this));

        } else {
            $respuesta = json_encode($this);
        }
        return $respuesta;
    }
    //practica antigua
    public static function writeJson($object, $ruta)
    {
        $data = $object->toJson($object);
        echo "Previsualizacion del JSon:" . $data . "<br>";
        if (fopen($ruta, "r")) {
            $datosNuevos = file_get_contents($ruta);
            $datosNuevos .= $data . ",";
            file_put_contents($ruta, $datosNuevos);
            echo ("Datos guardados en " . $ruta);
        } else {
            echo ("El archivo no esta");
        }
    }
    public static function conectDB()
    {
        $user = 'root';
        $host = '127.0.0.1';
        $password = '';
        $name = 'monfab';
        $port = '3306';
        try {
            self::$bd = new GestionBD($user, $password, $host, $port, $name);
        } catch (PDOException $x) {
            throw new Exception("Error en la conexion");
        }

        return self::$bd;
    }

    public static function closeDB()
    {

        self::$bd = null;
    }
    public static function getElement($id = null)
    {

        $bd = Element::conectDB();
        if ($bd) {
            $pdo = $bd->getPDO();
        } else {
            throw new Exception('La bd ha fallado');
        }



        if (isset($id) && $id != null && $bd != null && $pdo != null) {
            $respuesta = $bd->ejecutaConsulta($pdo, 'SELECT * FROM elementos WHERE id= :param', $id);
        } else {
            $respuesta = Element::allElements();
        }

        Element::closeDB();
        return $respuesta;
    }
    public static function allElements()
    {
        $bd = Element::conectDB();
        if ($bd) {
            $pdo = $bd->getPDO();
        } else {
            throw new Exception('La bd ha fallado');
        }

        $respuesta = $bd->ejecutaConsulta($pdo, 'SELECT * from elementos', null);

        Element::closeDB();
        return $respuesta;
    }
    public static function deleteElement($id = null)
    {
        $bd = Element::conectDB();
        if ($bd) {
            $pdo = $bd->getPDO();
        } else {
            throw new Exception('La bd ha fallado');
        }
        try {
            if (isset($id) && $id != null) {
                $element = Element::getElement($id);
                $datos = $bd->ejecutaConsulta($pdo, 'DELETE FROM elementos WHERE id= :param', $id);

            }
        } catch (Exception $ew) {
            throw new Exception('No has pasado el id');
        }

        Element::closeDB();

        return $element;


    }
    public static function guardar($elemento, $id, $bindParams, $queryParams)
    {
        $data = null;
        if ($elemento != null && $id == null) {
            $data = Element::insertElement($elemento);
        } else {
            if ($elemento == null && $id != null && $bindParams != null && $queryParams != null) {
                $data = Element::updateElement($id, $bindParams, $queryParams);
            }
        }
        return $data;
    }



    public static function createElement()
    {
        $paramarray = [];
        $nombre = trim($_POST["nombre"]) ?? null;
        $descripcion = trim($_POST["descripcion"]) ?? null;
        $nserie = trim($_POST['nserie']) ?? null;
        $estado = trim($_POST['estado']) ?? null;
        $prioridad = trim($_POST["prioridad"]) ?? null;
        if (isset($nombre) && $nombre != "" && $nombre != null) {
            $usr_name = $nombre;
            array_push($paramarray, $usr_name);
        } else {
            $usr_name = null;
        }

        if (isset($descripcion) && $descripcion != "" && $descripcion != null) {
            $usr_p_descript = trim($descripcion);
            array_push($paramarray, $usr_p_descript);
        } else {

            $usr_p_descript = null;
        }
        if (isset($nserie) && $nserie != "" && $nserie != null) {
            $usr_id_num = $nserie;
            array_push($paramarray, $usr_id_num);

        } else {
            $usr_id_num = null;
        }
        if (isset($estado) && $estado != "" && $estado != null) {
            $usr_status = trim($estado);
            array_push($paramarray, $usr_status);
        } else {
            $usr_status = "off";
            array_push($paramarray, $usr_status);
        }
        if (isset($prioridad) && $prioridad != "" && $prioridad != null) {
            switch (trim($prioridad)) {
                case 'Low':
                    $usr_priority = 'low';
                    array_push($paramarray, $usr_priority);
                    break;
                case 'Medium':
                    $usr_priority = 'medium';

                    array_push($paramarray, $usr_priority);
                    break;
                case 'High':
                    $usr_priority = 'high';

                    array_push($paramarray, $usr_priority);
                    break;
                default:
                    $usr_priority = 'low';

                    array_push($paramarray, $usr_priority);
            }
        } else {
            $usr_priority = "low";

            array_push($paramarray, $usr_priority);
        }
        ;
        try {
            return $elemento = new Element(...$paramarray);
        } catch (ArgumentCountError $x) {
            throw new Exception('Faltan propiedades para generar el elemento');
        }

    }
    public static function insertElement($elemento)
    {
        $bd = Element::conectDB();
        if ($bd) {
            $pdo = $bd->getPDO();
        } else {
            throw new Exception('La bd ha fallado');
        }
        $elementoRecuperado = null;
        try {
            if ($elemento != null) {
                $elementoRecuperado = $bd->ejecutaConsulta2($pdo, 'INSERT INTO elementos(nombre, descripcion, nserie, estado, prioridad) VALUES (:name,:descripcion,:nserie,:status,:prioridad)', null, $elemento, null, null);

            } else {

                $elementoRecuperado = null;
            }
        } catch (PDOException $e) {
            throw new Exception('Error en la query');
        }

        Element::closeDB();
        return $elementoRecuperado;
    }
    public static function updateElement($id, $bindParams, $arrayquery)
    {
        $bd = Element::conectDB();
        if ($bd) {
            $pdo = $bd->getPDO();
        } else {
            throw new Exception('La bd ha fallado');
        }

        $ndatos = count($bindParams) - 1;
        $query = "";
        for ($i = 0; $i <= $ndatos; $i++) {
            $query .= " " . $arrayquery[$i] . '=:' . $arrayquery[$i] . ",";
        }
        $query = substr($query, 0, -1);
        $elementoModificado = $bd->ejecutaConsulta2($pdo, "UPDATE elementos  SET$query WHERE id = :id", $id, null, $bindParams, $arrayquery);
        Element::closeDB();
        return $elementoModificado;
    }

    public static function message($boolean, $message, $data)
    {
        $msgTemp = new stdClass();
        $msgTemp->success = $boolean;
        $msgTemp->message = $message;
        $msgTemp->data = $data;
        return $mensaje = json_encode($msgTemp);


    }


    public function setDatosNuevos()
    {
        $nombre = trim($_POST["nombre"]) ?? null;
        $descripcion = trim($_POST["descripcion"]) ?? null;
        $nserie = trim($_POST['nserie']) ?? null;
        $estado = trim($_POST['estado']) ?? null;
        $prioridad = trim($_POST["prioridad"]) ?? null;
        if (isset($nombre) && $nombre != "" && $nombre != null) {
            $this->setName($nombre);
            $bindParams[] = $nombre;
            $queryParams[] = "nombre";
        }

        if (isset($descripcion) && $descripcion != "") {
            $this->setDescripcion($descripcion);
            $bindParams[] = $descripcion;
            $queryParams[] = "descripcion";
        }
        if (isset($nserie) && $nserie != "") {
            $this->setNserie($nserie);
            $bindParams[] = $nserie;
            $queryParams[] = "nserie";
        }
        if (isset($estado) && $estado != "") {

            $this->setNserie($estado);
            $bindParams[] = $estado;
            $queryParams[] = "estado";
        }
        if (isset($prioridad) && $prioridad != "") {
            switch ($prioridad) {
                case 'Low':
                    $this->setPrioridad($prioridad);
                    $bindParams[] = $prioridad;
                    $queryParams[] = "prioridad";
                    break;
                case 'Medium':
                    $this->setPrioridad($prioridad);
                    $bindParams[] = $prioridad;
                    $queryParams[] = "prioridad";
                    break;
                case 'High':
                    $this->setPrioridad($prioridad);
                    $bindParams[] = $prioridad;
                    $queryParams[] = "prioridad";
                    break;
                default:
                    $this->setPrioridad($prioridad);
                    $bindParams[] = $prioridad;
                    $queryParams[] = "prioridad";
            }
        }
        try {
            $datos[] = $bindParams;
            $datos[] = $queryParams;
        } catch (Exception $e) {
            throw new Exception('Los datos de modificacion no estan bien o no llegan');
        }

        return $datos;
    }
    public static function fillElement($elemento)
    {
        $nombreP = trim($elemento["nombre"]) ?? null;
        $descripcionP = trim($elemento["descripcion"]) ?? null;
        $nserieP = trim($elemento["nserie"]) ?? null;
        $estadoP = trim($elemento["estado"]) ?? null;
        $prioridadP = trim($elemento["prioridad"]) ?? null;


        if (isset($nombreP) && $nombreP != null) {
            $nombre = $nombreP;
        }
        if (isset($descripcionP) && $descripcionP != null) {
            $descripcion = $descripcionP;
        }
        if (isset($nserieP) && $nserieP != null) {
            $nserie = $nombreP;
        }
        if (isset($estadoP) && $estadoP != null) {
            $estado = $estadoP;
        }
        if (isset($prioridadP) && $prioridadP != null) {

            $prioridad = $prioridadP;
        }
        try {
            return $elementoNew = new Element($nombre, $descripcion, $nserie, $estado, $prioridad);
        } catch (ArgumentCountError $x) {
            throw new Exception('No estan llegando bien los datos de servidor para cargar el elemento en cuestion');
        }
    }
}