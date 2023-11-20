<?php

namespace App\Controller;

use App\Model\Model;
use App\Model\Usuario;
use App\Model\Endereco;
use App\Controller\EnderecoController;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
use App\Cryptonita\Crypto;
class UserController {

    private $db;
    private $usuarios;
    private $enderecos;
    private $controllerenderecos;
    private $cripto;

    public function __construct() {
        $this->db = new Model();
        $this->usuarios = new Usuario();
        $this->enderecos = new Endereco();
        $this->cripto=new Crypto();
        // $this->db->excluirTabelaEndereco();
        // $this->db->criarTabelaEndereco();
    }

    public function select(){
        $user = $this->db->select('users');
        
        return  $user;
    }
    public function selectId($id){
        $user = $this->db->select('users',['id'=>$id]);
        
        return  $user;
    }

    public function selectIdade(){
        $user = $this->db->select('idades');
        
        return  $user;
    }
    public function insert($data){
        $this->usuarios->setNome($data['nome']);
        $this->usuarios->setEmail($data['email']);
        $this->usuarios->setSenha($data['senha']);
        $this->usuarios->setDataNascimento($data['datanascimento']);
        $this->usuarios->setPerfilId(1);
        if($this->db->insert('users', [
            'nome'=>$this->usuarios->getNome(),
            'email'=>$this->usuarios->getEmail(),
            'senha'=>$this->usuarios->getSenha(),
            'datanascimento'=> $this->usuarios->getDataNascimento(),
            'perfil_id'=> $this->usuarios->getPerfilId()
            ])){
            $this->enderecos->setCep($data['cep']);
            $this->enderecos->setRua($data['rua']);
            $this->enderecos->setBairro($data['bairro']);
            $this->enderecos->setCidade($data['cidade']);
            $this->enderecos->setUf($data['uf']);
            $this->enderecos->setIduser($this->db->getLastInsertId());
            $this->controllerenderecos = new EnderecoController($this->enderecos);
           if ($this->controllerenderecos->insert()) {
            return true;
           } 
        }
        return false;
    }
    public function update($newData,$condition){
        if($this->db->update('users', $newData, ['id'=>$condition])){
            return true;
        }
        return false;
    }
    public function delete( $conditions){
        if($this->db->delete('users', ['id'=>$conditions])){
            return true;
        }
        return false;
        
    }

    public function validarToken($token){
        
        $key = TOKEN;
        $algoritimo = 'HS256';
        try {
            $decoded = JWT::decode($token, new Key($key, $algoritimo));
            // var_dump($decoded);exit;
            $permissoes = $decoded->telas;
            return ['status' => true, 'message' => 'Token válido!', 'tela'=>$permissoes];
        } catch(Exception $e) {
            return ['status' => false, 'message' => 'Token inválido! Motivo: ' . $e->getMessage()];
        }
    }
    public function login($senha,$email) {
        $condicoes = ['email' => $email];
        $resultado = $this->db->select('users', $condicoes);
        // var_dump($this->db->selectPermissoesPorPerfil(1));exit;
        $checado=3;
        if (!$resultado) {
            return ['status' => false, 'message' => 'Usuário não encontrado.'];
        }
        if (!password_verify($senha, $resultado[0]['senha'])) {
            return ['status' => false, 'message' => 'Senha incorreta.'];
        }
        $permissoes = $this->db->selectPermissoesPorPerfil($resultado[0]['perfil_id']);
        // var_dump($permissoes);exit;
        $key = TOKEN;
        $algoritimo='HS256';
            $payload = [
                "iss" => "localhost",
                "aud" => "localhost",
                "iat" => time(),
                "exp" => time() + (60 * $checado),  
                "sub" => $this->usuarios->getEmail(),
                'telas'=>$permissoes
            ];
            
            $jwt = JWT::encode($payload, $key,$algoritimo);
        return ['status' => true, 'message' => 'Login bem-sucedido!','token'=>$jwt,'telas'=>$permissoes];
    }
    public function adicionarUsuario(){
        return $this->insert($this->usuarios);
    }
    
    public function listarUsuarios(){
        return $this->select($this->usuarios);
    }
    public function listarUsuariosDescriptografado(){
        $resultado=$this->select($this->usuarios);
        $retorno[]=[
            'id' => $resultado[0]['id'],
            'nome' => $resultado[0]['nome'],
            'email' => $resultado[0]['email'],
            'criado' => $resultado[0]['criado'],
        ];
             
        return $retorno;
    }
    
    public function buscarPorEmail(string $email){
        $condicoes = ['email' => $email];
        $resultados = $this->select($this->usuarios, $condicoes);
        return count($resultados) > 0 ? $resultados[0] : null;
    }
    
    public function removerUsuario(){
        $condicoes = ['email' => $this->usuarios->getEmail()];
        return $this->delete($this->usuarios, $condicoes);
    }

    
}
