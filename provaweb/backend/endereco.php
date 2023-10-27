<?php

namespace App\endereco;
require "../vendor/autoload.php";

use App\Controller\EnderecoController;
use App\Model\Endereco;
use App\Controller\AutorizarController;

$ende = new Endereco();
$autorizado = new AutorizarController();

$autorizado->autorizado();
$body = json_decode(file_get_contents('php://input'), true);
$id=isset($_GET['iduser'])?$_GET['iduser']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "POST";
        $ende->setCep($body['cep']);
        $ende->setRua($body['rua']);
        $ende->setBairro($body['bairro']);
        $ende->setCidade($body['cidade']);
        $ende->setUf($body['uf']);
        $ende->setIduser($body['iduser']);   
        $enderecocontroller = new EnderecoController($ende); 
        $resultado = $enderecocontroller->insert();    
        echo json_encode(['status'=>$resultado]);
    break;
    case "GET";
        if(!isset($_GET['iduser'])){
            $enderecocontroller = new EnderecoController($ende); 
            $resultado = $enderecocontroller->select();
            echo json_encode(["endereco"=>$resultado]);
        }else{
            $enderecocontroller = new EnderecoController($ende); 
            $resultado = $enderecocontroller->selectId($iduser);
            echo json_encode(["status"=>true,"endereco"=>$resultado[0]]);
        }
       
    break;
    case "PUT";
        $enderecocontroller = new EnderecoController($ende); 
        $resultado = $enderecocontroller->update($body,intval($_GET['iduser']));
        echo json_encode(['status'=>$resultado]);
    break;
    case "DELETE";
        $enderecocontroller = new EnderecoController($ende); 
        $resultado = $enderecocontroller->delete(intval($_GET['iduser']));
        echo json_encode(['status'=>$resultado]);
    break;  
}