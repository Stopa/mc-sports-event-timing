CREATE USER 'mchw'@'%' IDENTIFIED BY 'S1mpl3P4s5w0Rd';

CREATE DATABASE mchw;

USE mchw;

CREATE TABLE athletes (
  id varchar(36),
  name varchar(255) not null,
  start_number int not null,
  primary key(id)
) CHARACTER SET utf8;

GRANT INSERT, UPDATE, SELECT ON athletes TO mchw;
