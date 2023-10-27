use test_drive;

CREATE TABLE users (
	id INT PRIMARY KEY auto_increment,
	nome VARCHAR(100),
    email VARCHAR(100),
	senha VARCHAR(100),
	criado DATETIME DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE produtos (
	id INT PRIMARY KEY auto_increment,
	nome VARCHAR(100),
	preco VARCHAR(100),
	quantidade INT, 
	criado DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE endereco(
	id INT PRIMARY KEY auto_increment,
	cep VARCHAR(10),
	rua VARCHAR(70),
	bairro VARCHAR(70),
	cidade VARCHAR(70),
	uf VARCHAR(2),
	iduser INT 
);

CREATE TABLE vendas(
	id INT PRIMARY KEY auto_increment,
    iduser INT,
	data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_vendas(
	id INT PRIMARY KEY auto_increment,
    id_vendas INT,
    id_produtos INT,
    quantidade INT,
    preco VARCHAR(100)
);

ALTER TABLE itens_vendas CHANGE quantidade quantidade_vendas INT;

CREATE TABLE token (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NULL,
  token VARCHAR(45) NULL,
  expira DATETIME NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE),
  INDEX users_idx (id_usuario ASC) VISIBLE
);

/* Trigger ativa quando produto é excluido na itens vendas */
DELIMITER //
CREATE TRIGGER trg_itens_vendas_after_delete 
AFTER DELETE ON itens_vendas FOR EACH ROW
BEGIN
    CALL DeleteProduto(OLD.id_produtos, OLD.quantidade);
END;
// DELIMITER ;

/* Procedure que exclui linha da tabela produto quando excluido da itens venda */
DELIMITER //
CREATE PROCEDURE DeleteProduto(IN id_produto INT, IN quantidade INT)
BEGIN
	IF EXISTS (SELECT * FROM produtos WHERE id = id_produtos) THEN
        DELETE FROM produtos WHERE id = id_produtos;
    END IF;
END  
// DELIMITER

/* Trigger ativa quando produto é adicionado na itens vendas */
DELIMITER //
CREATE TRIGGER trg_itens_vendas_after_insert 
AFTER INSERT ON itens_vendas FOR EACH ROW
BEGIN
    CALL VendaProduto(NEW.id_produtos, NEW.quantidade);
END;
// DELIMITER ;

/* Procedure que atualiza a tabela produto */
DELIMITER //
CREATE PROCEDURE VendaProduto(IN id_produto INT, IN quantidade INT)
BEGIN
	UPDATE produtos SET quantidade = quantidade - quantidade_vendas WHERE id = id_produtos;
END  
// DELIMITER

/*  trigger ativa quando a quantidade do produto na itens_venda for alterado, 
atualizar na tabela produtos*/
DELIMITER //
CREATE TRIGGER trg_itens_vendas_after_update 
AFTER UPDATE ON itens_vendas FOR EACH ROW
BEGIN
    UPDATE produtos
    SET quantidade = quantidade + quantidade_vendas WHERE id = id_produtos;
END;
//
DELIMITER ;

/*  trigger do token*/
DELIMITER //
CREATE TRIGGER set_expira_data_before_insert
BEFORE INSERT ON token
FOR EACH ROW
BEGIN
    SET NEW.expira = NOW() + INTERVAL 5 MINUTE;
END;
//
DELIMITER ;

CREATE VIEW usuarioendereco AS SELECT nome, email, cidade, uf FROM users, endereco;
SELECT * from usuarioendereco;
    
ALTER TABLE token
add FOREIGN KEY (id_usuario) 
REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE itens_vendas
add FOREIGN KEY (id_produtos) 
REFERENCES produtos(id);

ALTER TABLE itens_vendas
add FOREIGN KEY (id_vendas) 
REFERENCES vendas(id);

ALTER TABLE vendas
add FOREIGN KEY (iduser) 
REFERENCES users(id);

ALTER TABLE endereco
add FOREIGN KEY (iduser) 
REFERENCES users(id);

SELECT * FROM users;
SELECT * FROM endereco;
SELECT * FROM produtos;

drop table users, endereco, produtos;