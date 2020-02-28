DROP DATABASE IF EXISTS mojodb;

CREATE DATABASE mojodb;

USE mojodb;

-- You don't need to run the tables in your MySQL workbench, the models do all the table building for you
-- this is just a visual representation of how you would make these tables in MySQL workbench to help me structure
-- the models correctly

-- CREATE TABLE Posts (
--     id INT NOT NULL AUTO_INCREMENT,
--     title VARCHAR(60),
--     body TEXT NOT NULL,
--     UserId INT REFERENCES Users(id),
--     MoodId INT REFERENCES Moods(id),
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id) 
-- );

-- CREATE TABLE Users (
--     id INT NOT NULL AUTO_INCREMENT,
--     username VARCHAR(30) NOT NULL UNIQUE,
--     password VARCHAR(60) NOT NULL,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE Moods (
--     id INT NOT NULL AUTO_INCREMENT,
--     mood VARCHAR(30),
--     color VARCHAR(30),
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id)
-- );