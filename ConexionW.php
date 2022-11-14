<?php

class ConexionW
{

    public $user;
    public $password;
    public $host;
    public $port;
    public $name;
    

    public function __construct($user, $password, $host, $port, $name)
    {

        $this->user = $user;
        $this->password = $password;
        $this->host = $host;
        $this->port = $port;
        $this->name = $name;
    }
}