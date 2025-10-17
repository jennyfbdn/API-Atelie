
USE bd_atelie

GO

CREATE TABLE Usuario

( 

   id            INT			IDENTITY,

   nome          VARCHAR(100)	NOT NULL,

   email         VARCHAR(100)	UNIQUE NOT NULL,

   senha         VARCHAR(100)	NOT NULL,

   telefone      VARCHAR(100)	NOT NULL,

   nivelAcesso   VARCHAR(10)    NULL, -- ADMIN ou USER

   dataCadastro	 SMALLDATETIME	NOT NULL,

   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id)

)

GO

INSERT Usuario (nome, email, senha, telefone, nivelAcesso, dataCadastro, statusUsuario)

VALUES ('Fulano da Silva', 'fulano@email.com.br', 'MTIzNDU2Nzg=', '987654321','ADMIN', GETDATE(), 'ATIVO') 

INSERT Usuario (nome, email, senha, telefone, nivelAcesso, dataCadastro, statusUsuario)

VALUES ('Beltrana de Sá', 'beltrana@email.com.br', 'MTIzNDU2Nzg=', '987654321','USER', GETDATE(), 'ATIVO')

GO

CREATE TABLE Categoria

(

	id	 INT		  IDENTITY,

	nome VARCHAR(100) NOT NULL,  -- QUEIJO, FRANGO, CARNES & FRIOS, LEGUMES, DOCES, ESPECIAS, PEIXE

	icone VARCHAR(100) NOT NULL,

	PRIMARY KEY(id)

)

GO

INSERT Categoria (nome, icone) VALUES ('VESTIDO', 'vestido')

INSERT Categoria (nome, icone) VALUES ('SAIA', 'saia')

INSERT Categoria (nome, icone) VALUES ('CAMISA', 'camisa')

INSERT Categoria (nome, icone) VALUES ('CALÇA', 'calca')

INSERT Categoria (nome, icone) VALUES ('BLUSA E JAQUETA', 'blusa_jaqueta')

INSERT Categoria (nome, icone) VALUES ('CONJUNTO', 'conjunto')

INSERT Categoria (nome, icone) VALUES ('ARREMATE', 'arremate')

INSERT Categoria (nome, icone) VALUES ('PERSONALIZAR', 'personalizar')

INSERT Categoria (nome, icone) VALUES ('AJUSTE', 'ajuste')

GO

CREATE TABLE Produto

(

	id			 INT		    IDENTITY,

	nome	     VARCHAR(100)	NOT NULL,

	tipo		 VARCHAR(20)	NOT NULL, -- ROUPA ou SERVIÇO

	descricao	 VARCHAR(400)	NOT NULL,

	codigoBarras VARCHAR(100)	NULL,

	foto		 VARBINARY(max) NULL,

	preco		 DECIMAL(8,2)	NOT NULL,

	categoria_id INT			NOT NULL,

	statusProduto	 VARCHAR(10)	NOT NULL, -- ATIVO, CARDAPIO ou INATIVO

	PRIMARY KEY (id),

	FOREIGN KEY (categoria_id) REFERENCES Categoria (id)

)

GO

INSERT Produto (nome, tipo, descricao, codigoBarras, foto, preco, categoria_id, statusProduto) 

VALUES ('vestido', 'ROUPA', 'junin', NULL, NULL, 29.98, 2, 'ATIVO')

 
CREATE TABLE Servico

(

	id			 INT		    IDENTITY,

	nome	     VARCHAR(100)	NOT NULL,

	descricao	 VARCHAR(400)	NOT NULL,

	dataEntrega  SmallDateTime  NULL,

	dataEntrada  SmallDateTime NOT NULL,

	preco		 DECIMAL(8,2)	NOT NULL,

	produto_id	 INT			NOT NULL,

	usuario_id	 INT			NOT NULL,

	statusServico	 VARCHAR(10)	NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),

	FOREIGN KEY (produto_id) REFERENCES Produto (id),

	FOREIGN KEY (Usuario_id) REFERENCES Usuario (id)

)

 
CREATE TABLE Mensagem

(

	id	            INT			  IDENTITY,

	dataMensagem    SMALLDATETIME NOT NULL,

	emissor			VARCHAR(100)  NOT NULL,

	email 	        VARCHAR(100)  NOT NULL,

	telefone	    VARCHAR(20)       NULL,

	texto 	        VARCHAR(400)  NOT NULL,

	statusMensagem  VARCHAR(10)   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id)

)

GO

INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 

VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@email.com', '(11) 98765-4123', 'Mensagem de teste', 'ATIVO')

INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 

VALUES (GETDATE(), 'Maria Onete', 'maria@email.com', null, 'Segunda mensagem de teste', 'ATIVO')

GO

 
CREATE TABLE Promocao

(

	id	            INT			   IDENTITY,

	nome			VARCHAR(50)    NOT NULL,

	descricao			VARCHAR(100)   NOT NULL,

	dataCadastro DateTime NOT NULL,

	foto			VARBINARY(MAX)     NULL,

	preco  DECIMAl (8,2) NOT NULL,

	desconto DECIMAL (8,2) NOT NULL,

	statusPromocao	VARCHAR(10)	   NOT NULL, -- ATIVO ou INATIVO

)

GO

CREATE TABLE Agendamento (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT,
    usuario_nome VARCHAR(255),
    servico VARCHAR(255),
    descricao NVARCHAR(MAX),
    data_agendamento VARCHAR(20),
    hora_agendamento VARCHAR(10),
    orcamento DECIMAL(10,2),
    status VARCHAR(50),
    data_criacao DATETIME DEFAULT GETDATE()
);
CREATE TABLE Encomenda (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    usuario_id BIGINT,
    usuario_nome VARCHAR(255),
    produto VARCHAR(255),
    quantidade INT,
    altura VARCHAR(50),
    largura VARCHAR(50),
    busto VARCHAR(50),
    personalizacao NVARCHAR(MAX),
    data_retirada VARCHAR(20),
    hora_retirada VARCHAR(10),
    preco DECIMAL(10,2),
    status VARCHAR(50),
    data_criacao DATETIME DEFAULT GETDATE()
);

GO

INSERT Promocao (id, nome, descricao,foto, preco, desconto, statusPromocao) 

VALUES ('', '', '', '', '', '', '', '')

 
SELECT * FROM Usuario
SELECT * FROM Mensagem
SELECT * FROM Categoria
SELECT * FROM Produto
SELECT * FROM Promocao
SELECT * FROM Encomenda
SELECT * FROM Agendamento
 
/* VERIFICAR CONEXÕES EXISTENTES */

/*

SELECT * FROM sys.dm_exec_sessions

WHERE database_id = DB_ID('bd_pizzaria_3d')

AND host_name IS NOT NULL

AND program_name LIKE 'Microsoft SQL Server Management Studio%'

*/

/*

CREATE TABLE Avaliacao

(

	id	            INT			   IDENTITY,

    dataCadastro	SMALLDATETIME  NOT NULL,

	usuario_id		INT			   NOT NULL,

	produto_id		INT			   NOT NULL,

	nota			DECIMAL(3,1)   NOT NULL,

	comentario	    VARCHAR(100)       NULL,

	statusAvaliacao	VARCHAR(10)	   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),

	FOREIGN KEY (usuario_id) REFERENCES Usuario (id),

	FOREIGN KEY (produto_id) REFERENCES Produto (id)

)

GO

CREATE TABLE ProdutoNota

(

	id	              INT			 IDENTITY,

    dataAtualizacao	  SMALLDATETIME  NOT NULL,

	produto_id		  INT			 NOT NULL,

	nota			  DECIMAL(3,1)   NOT NULL,

	statusProdutoNota VARCHAR(10)	 NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),

	FOREIGN KEY (produto_id) REFERENCES Produto (id)

)

GO



 

drop table Usuario
 