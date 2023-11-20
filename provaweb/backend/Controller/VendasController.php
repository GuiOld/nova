<?php

namespace App\Controller;

use App\Model\Model;
use App\Model\Venda;

class VendasController {

    private $db;

    private $vendas;
    
    public function __construct() {
        $this->db = new Model();
        $this->vendas = new Venda();
    }
    public function select(){
        $venda = $this->db->select('vendas2');
        
        return  $venda;
    }
    public function selectId($id){
        $venda = $this->db->select('vendas2',['id'=>$id]);
        
        return  $venda;
    }

    public function selectVenda(){
        $user = $this->db->select('itemVenda');
        
        return  $user;
    }
    public function insert($data){
        $this->vendas->setiduser($data['iduser']);
        $this->vendas->setidprod($data['idprod']);
        if($this->db->insert('vendas2', [
            'iduser'=>$this->vendas->getiduser(),
            'idprod'=>$this->vendas->getidprod() ])){
         
            return true;
           } 
        return false;
        // if($this->db->insert('vendas2', $data)){
        //     return true;
        // }
        // return false;
    }
    public function update($newData,$conditions){
        if($this->db->update('vendas2', $newData, ['id'=>$conditions])){
            return true;
        }
        return false;
    }
    public function delete( $conditions){
        if($this->db->delete('vendas2', ['id'=>$conditions])){
            return true;
        }
        return false;
        
    }
}
