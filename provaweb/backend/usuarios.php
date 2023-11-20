<?php

namespace App\usuarios;
require "../vendor/autoload.php";

use App\Controller\UserController;
// use App\Controller\AutorizarController;

$users = new UserController();
// $autorizado = new AutorizarController();

// $autorizado->autorizado();
$body = json_decode(file_get_contents('php://input'), true);
// var_dump(file_get_contents('php://input')); exit;
$id=isset($_GET['id'])?$_GET['id']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "POST";
    if(isset($body['atualizar'])){
        $resultado = $users->update($body,intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    }
    if(isset($body['deletar'])){
        $resultado = $users->delete(intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    }
        $resultado = $users->insert($body);
        echo json_encode(['status'=>$resultado]);
    break;
    case "GET";
        if(!isset($_GET['id'])){
            $resultado = $users->select();
            echo json_encode(["usuarios"=>$resultado]);
        }else{
            $resultado = $users->selectId($id);
            echo json_encode(["status"=>true,"usuario"=>$resultado[0]]);
        }
       
    break;
}