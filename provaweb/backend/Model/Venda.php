<?php
namespace App\Model;
class Venda {
    private $id;
    private $iduser;
    private $idprod;

    public function __construct() {
      
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getiduser() {
        return $this->iduser;
    }
    public function setiduser($iduser) {
        $this->iduser = $iduser;
    }
    public function getidprod() {
        return $this->idprod;
    }
    public function setidprod($idprod) {
        $this->idprod = $idprod;
    }
   
    public function getType() {
        return 'vendas2';
    }

    public function toArray() {
        return ['id' => $this->getId(), 'iduser' => $this->getiduser(), 'idprod' => $this->getidprod(),'type' => $this->getType()];
    }
}
