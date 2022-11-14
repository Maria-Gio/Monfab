<?php
namespace iToJsonPHP;
interface IToJson
{

    public function toJson($archivo);
    public static function writeJson($object, $ruta);
}