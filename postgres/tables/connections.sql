BEGIN TRANSACTION;
CREATE TABLE connections (
    id serial PRIMARY KEY,
    established TIMESTAMP NOT NULL,
    fromuser VARCHAR(100) NOT NULL,
    touser VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL
    );
COMMIT;