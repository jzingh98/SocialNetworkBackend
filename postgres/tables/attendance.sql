BEGIN TRANSACTION;
CREATE TABLE attendance (
    id serial PRIMARY KEY,
    event VARCHAR(100) NOT NULL,
    attendee VARCHAR(100) NOT NULL,
    created TIMESTAMP NOT NULL
    );
COMMIT;