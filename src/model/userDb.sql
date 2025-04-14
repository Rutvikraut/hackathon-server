drop database if exists hackathon;
create database hackathon;
use database hackathon;

create table user(
    userId INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50),
    email VARCHAR(30),
    password VARCHAR(20),
    phone_no VARCHAR(10),
    createdTimestamp DATE default CURRENT_TIMESTAMP
);


