drop database if exists hackathon;
create database hackathon;
use hackathon;

create table user(
    userId INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50),
    email VARCHAR(30),
    password VARCHAR(200),
    phone_no VARCHAR(10),
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);




