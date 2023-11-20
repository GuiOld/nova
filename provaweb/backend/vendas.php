<?php

namespace App\usuarios;
require "../vendor/autoload.php";

use App\Controller\VendasController;
// use App\Controller\AutorizarController;

$vendas = new VendasController();
// $autorizado = new AutorizarController();

// $autorizado->autorizado();
$body = json_decode(file_get_contents('php://input'), true);
// var_dump(file_get_contents('php://input')); exit;
$id=isset($_GET['id'])?$_GET['id']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "POST";
        $resultado = $vendas->insert($body);
        echo json_encode(['status'=>$resultado]);
    break;
    case "GET";
        if(!isset($_GET['id'])){
            $resultado = $vendas->select();
            echo json_encode(["vendas"=>$resultado]);
        }else{
            $resultado = $vendas->selectId($id);
            echo json_encode(["status"=>true,"venda"=>$resultado[0]]);
        }
       
    break;
    case "PUT";
        $resultado = $vendas->update($body,intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;
    case "DELETE";
        $resultado = $vendas->delete(intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;  
}