-- To use the database on your localhost server for the first time you must open mySQL workbench and edit the createdAt and updatedAt columns to
-- have the default value of CURRENT_TIMESTAMP. You have to do this for all the tables each time drop and create the tables. You can edit your tables
-- by clicking the little wrench icon next to the table name in your schema navigator.

-- To create a new user you have to use the signup form on the app, or the user password won't be encrypted and you won't be able to test login functionality
-- You can also create a new user via postman by going to http://localhost:8080/api/users and using POST you can create a new user by entering json data
-- examle: 
-- {
--    "username": "",
--    "name": "",
--    "email": ""
--    "password": "",
-- }
-- if done correctly you should get a response from the server with your new user id, an encrypted password and timestamps for updatedAt and createdAt



-- INSERT INTO Users (username, name, email, password) VALUES ("the_clown", "John Gacy", "clown@mail.com", "password");
-- INSERT INTO Users (username, name, email, password) VALUES ("bSimpson", "Bart", "bart@fartmail.com", "fartword");

INSERT INTO Moods (mood, color) VALUES ("Happy", "Pink");
INSERT INTO Moods (mood, color) VALUES ("Sad", "Blue");
INSERT INTO Moods (mood, color) VALUES ("Angry", "Orange");
INSERT INTO Moods (mood, color) VALUES ("Scared", "Yellow");
INSERT INTO Moods (mood, color) VALUES ("Surprised", "Green");

INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("First post", "This is my first post on my new blog!", 1, 1);
INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("Second post", "Hey look this is my second post! I'm sad!", 1, 2);
INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("yo nerds", "hey yall just got this new blog wud up", 2, 1);
INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("shit sucks", "sup yall I'm depressed life sucks peace out", 2, 2);
INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("New blog new me", "Excited for a brand new start with a bran new journal!", 1, 5);
INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("Turns out new blog doesn't mean new me", "I thought this would help me work through my husband's murder but it hasn't helped me solve the case at all", 2, 2);
INSERT INTO Posts (title, body, UserId, MoodId) VALUES ("vengence will be mine", "I will have blood", 1, 3);

