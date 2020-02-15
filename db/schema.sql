DROP DATABASE IF EXISTS mojodb;

CREATE DATABASE mojodb;

USE mojodb;

CREATE TABLE Posts (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60),
    body TEXT NOT NULL,
    author_id INT REFERENCES Authors(id),
    PRIMARY KEY (id) 
);

CREATE TABLE Authors (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Moods (
    id INT NOT NULL AUTO_INCREMENT,
    mood VARCHAR(30),
    color VARCHAR(30)
);