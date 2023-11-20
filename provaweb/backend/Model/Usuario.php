<?php
namespace App\Model;
class Usuario {
    private $id;
    private $nome;
    private $email;
    private $senha;
    private $datanascimento;
    private int $perfilid;

    public function __construct() {
      
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome = $nome;
    }
    public function getEmail() {
        return $this->email;
    }
    public function setEmail($email) {
        $this->email = $email;
    }
    public function getDataNascimento() {
        return $this->datanascimento;
    }
    public function setDataNascimento($datanascimento) {
        $this->datanascimento = $datanascimento;
    }
    public function setSenha($senha) {
        $this->senha = password_hash($senha, PASSWORD_DEFAULT);
    }
    public function getSenha() {
        return $this->senha;
    }    

    public function getPerfilId(): int
    {
        return $this->perfilid;
    }

    public function setPerfilId(int $perfilid): void
    {
        $this->perfilid = $perfilid;
    }
    
    public function getType() {
        return 'User';
    }

    public function toArray() {
        return ['id' => $this->getId(), 'nome' => $this->getNome(), 'type' => $this->getType()];
    }
}
