BEGIN TRANSACTION;
CREATE TABLE posts (
    id serial PRIMARY KEY,
    poster VARCHAR(100) NOT NULL,
    details VARCHAR(1000) NOT NULL,
    title VARCHAR(100) NOT NULL
    );
COMMIT;