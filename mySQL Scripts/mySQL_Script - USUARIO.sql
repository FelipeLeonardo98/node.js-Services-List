CREATE DATABASE db_nodeJobs;
USE db_nodeJobs;

CREATE TABLE USUARIO(
ID INT NOT NULL AUTO_INCREMENT
,NM_LOGIN VARCHAR(30) NOT NULL UNIQUE
,CD_SENHA VARCHAR(10) NOT NULL
,CD_PERMISSAO ENUM('A' , 'P')
,CONSTRAINT PK_USUARIO PRIMARY KEY(ID)
);


INSERT INTO USUARIO VALUES
(default,'Fleonardo','passadmin','A'),
(default,'Ireis','passpadrao','P');

select * from usuario;

-- after create table in node.js
show tables;
desc jobs;