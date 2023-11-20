<?php

namespace App\Venda;
require "../vendor/autoload.php";

use App\Controller\VendasController;

$vendas = new VendasController();

$body = json_decode(file_get_contents('php://input'), true);
$id=isset($_GET['id'])?$_GET['id']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "GET";
            $resultado = $vendas->selectVenda();
            if(!is_array($resultado)){
                echo json_encode(["status"=>false]);
                exit;
            }
            echo json_encode(["status"=>true,"vendas"=>$resultado]);
       
    break;
  
}