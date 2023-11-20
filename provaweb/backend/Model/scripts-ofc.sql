CREATE TABLE users (
	id INT PRIMARY KEY auto_increment,
	nome VARCHAR(100),
    email VARCHAR(100),
	senha VARCHAR(100),
	criado DATETIME DEFAULT CURRENT_TIMESTAMP
);

create table users_log(
	id INT PRIMARY KEY auto_increment,
	id_log INT,
	nome_log VARCHAR(100),
    email_log VARCHAR(100),
	senha_log VARCHAR(100),
    perfil_id_log INT,
	criado_log DATETIME DEFAULT CURRENT_TIMESTAMP
);



update users set perfil_id = 2 where id = 16;

select * from users;

alter table users ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`);

alter table users ADD perfil_GetPermissoesPorPerfilid INT;

ALTER TABLE users add FOREIGN KEY (perfil_id)  REFERENCES perfil(id);



alter table users ADD datanascimento text;

CREATE TABLE perfil (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome (nome)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



LOCK TABLES perfil WRITE;
INSERT INTO perfil VALUES (2,'Y'),(1,'X');
UNLOCK TABLES;

CREATE TABLE `perfil_permissoes` (
  `perfil_id` int NOT NULL,
  `permissao_id` int NOT NULL,
  PRIMARY KEY (`perfil_id`,`permissao_id`),
  KEY `permissao_id` (`permissao_id`),
  CONSTRAINT `perfil_permissoes_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`),
  CONSTRAINT `perfil_permissoes_ibfk_2` FOREIGN KEY (`permissao_id`) REFERENCES `permissoes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `perfil_permissoes` WRITE;
INSERT INTO `perfil_permissoes` VALUES (1,1),(1,2),(1,5),(1,10),
(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,10),(2,11);
UNLOCK TABLES;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPermissoesPorPerfil`(IN perfilId INT)
BEGIN
    SELECT perm.nome 
    FROM permissoes perm
    JOIN perfil_permissoes pp ON perm.id = pp.permissao_id
    WHERE pp.perfil_id = perfilId;
END ;;
DELIMITER ;

CREATE TABLE permissoes (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome (nome)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES permissoes WRITE;
INSERT INTO permissoes VALUES (1,'menu'),(2,'buscaprod'),(3,'buscauser'),(4,'cadastro'),
(5,'criarprod'),(6,'criaruser'),(7,'graficouser'),(8,'graficovenda'),(9,'itemvenda'),
(10,'todosprod'),(11,'todosuser');
UNLOCK TABLES;

CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `perfil_id` (`perfil_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `usuario` WRITE;
INSERT INTO `usuario` VALUES (1,'Y2N5cTBJT3liZGlENU4wcE1SMFcwQT09','aituK2pFZjAySEZtVytsZS8ycHJ6c2RUaVIreWg3U2xqcTJKUVd4cUk5QT0=','QWpxcHljYThveUxlaU42TzAvbm1ETzlZdTFXeG9Eck5zVHdXMUJURGpsQyt6R0RLemtQVTJETjhESEhPUjRtZVBUZ1VBcURVdlk4MXpmTWVVcjZGUHc9PQ==',1),(2,'U2FsUFZTVENmbUJVVjE3aFNBbnFvdz09','SFN4djFpMmxGRVByaVMwdjkwa1ZHYTNweGU1RUk4aEVReWFiaGRyNjkvbz0=','ZGVLT2NHM2NNQUxRc2FCY09TWWV4WkI2UTkzM2tOaTlxUEtLUjBvZHBRYXhCVjRnelh6alFtcW93aFNlM2gxaUFrRVVOVjFTQ203ZEJNNWNyMWR0U3c9PQ==',3);
UNLOCK TABLES;



CREATE VIEW idades AS 
SELECT 
    CASE 
        WHEN TIMESTAMPDIFF(YEAR, datanascimento, CURDATE()) <= 10 THEN 'Criança'
        WHEN TIMESTAMPDIFF(YEAR, datanascimento, CURDATE()) > 10 AND TIMESTAMPDIFF(YEAR, datanascimento, CURDATE()) <= 18 THEN 'Adolescente'
        WHEN TIMESTAMPDIFF(YEAR, datanascimento, CURDATE()) > 18 THEN 'Adulto'
        ELSE 'Bebê'
    END as idades,
    COUNT(datanascimento) as pessoas
FROM users
GROUP BY idades;

SELECT * from idades;

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

SELECT * FROM vendas2;	

CREATE TABLE vendas2(
	id INT PRIMARY KEY auto_increment,
    iduser INT,
    idprod INT,
	data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW itemVenda AS
SELECT iduser as pessoas, COUNT(idprod) AS produtos
FROM vendas2
GROUP BY iduser;

SELECT * FROM itemVenda;



drop view itemVenda;

ALTER TABLE vendas2
add FOREIGN KEY (iduser) 
REFERENCES users(id);

ALTER TABLE vendas2
add FOREIGN KEY (idprod) 
REFERENCES produtos(id);


ALTER TABLE itens_vendas CHANGE quantidade quantidade_vendas INT;


drop table token;
drop TRIGGER trg_itens_vendas_after_delete;
drop PROCEDURE DeleteProduto;
drop TRIGGER trg_itens_vendas_after_insert;
drop PROCEDURE VendaProduto;
drop TRIGGER set_expira_data_before_insert;

CREATE TABLE token (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT DEFAULT NULL,
  token VARCHAR(45) DEFAULT NULL,
  expira DATETIME NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE),
  INDEX users_idx (id_usuario ASC) VISIBLE
);

SELECT * FROM token;

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
    
CREATE VIEW clienteprodutos AS SELECT iduser, COUNT(id_produtos) FROM vendas, itens_vendas group by iduser;    
select * from clienteprodutos;

drop view clienteprodutos;
    
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