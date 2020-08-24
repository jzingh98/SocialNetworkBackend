BEGIN TRANSACTION;
CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    bio VARCHAR(1000) NOT NULL,
    joined TIMESTAMP,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL
    );
COMMIT;