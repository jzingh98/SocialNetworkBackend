-- Deploy fresh database tables

\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/connections.sql'
\i '/docker-entrypoint-initdb.d/tables/events.sql'
\i '/docker-entrypoint-initdb.d/tables/attendance.sql'
