CREATE DATABASE GAME_POO_II;

USE GAME_POO_II;

# JOGO DE POO II 
# Banco de dados onde a priori será guardado o login e ranking.

# Integrantes do trabalho.
# FILIPE WILLIAM CANELLO DE ALMEIDA
# GUSTAVO VENTURATO PEREIRA 
# JHONY REINHEIMER MAGALHÃES 

#######################################################################

CREATE TABLE JOGADORES(
PK_JOGADOR INTEGER UNIQUE NOT NULL,
NICKNAME VARCHAR(15) NOT NULL,
EMAIL VARCHAR(50) NOT NULL,
LOGIN VARCHAR(20) NOT NULL,
SENHA VARCHAR(20) NOT NULL,
FK_RANKEADA INTEGER UNIQUE NOT NULL,
###################################
PRIMARY KEY (PK_JOGADOR),
FOREIGN KEY (FK_RANKEADA) REFERENCES (PK_RANK)
);

-- CREATE TABLE JOGADORES(
--   ID INTEGER NOT NULL AUTO_INCREMENT,
--   NOME VARCHAR(20) NOT NULL,
--   LOGIN VARCHAR(20) NOT NULL,
--   EMAIL VARCHAR(50) NOT NULL,
--   SENHA VARCHAR(20) NOT NULL,
--   PONTOS INTEGER DEFAULT 0,
--   PRIMARY KEY (ID)
-- );


CREATE TABLE RANKEADA(
PK_RANK INTEGER UNIQUE NOT NULL,
PONTOS INTEGER DEFAULT 0,
###################################
PRIMARY KEY (PK_RANK)
);

