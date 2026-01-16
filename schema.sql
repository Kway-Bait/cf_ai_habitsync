DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY, Name TEXT);

INSERT INTO Users (UserId, Name) VALUES 
(1, 'Henry'),
(2, 'Maximus'),
(3, 'Ryan');
