CREATE TABLE todos (
  id serial PRIMARY KEY,
  title varchar(100) NOT NULL UNIQUE,
  status boolean NOT NULL DEFAULT false
);
