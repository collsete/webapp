CREATE DATABASE IF NOT EXISTS libreria_web;
USE libreria_web;

CREATE TABLE libros(
  id int(255) auto_increment not null,
  nombre varchar(255),
  description text,
  precio varchar(255),
  imagen varchar(255),
  editorial varchar(255),
  categoria varchar(255),
  stock varchar (255),
  rating varchar(255),
  autor varchar(255),

  CONSTRAINT pk_libro PRIMARY KEY(id)


)ENGINE = InnoDb;