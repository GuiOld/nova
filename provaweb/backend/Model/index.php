<?php
namespace App\Router;
require "../vendor/autoload.php";
$db = new \App\Model\Model();

if ($db->isConnected()) {
    echo "Conexão bem-sucedida!";
} else {
    echo "Erro ao conectar.";
}
