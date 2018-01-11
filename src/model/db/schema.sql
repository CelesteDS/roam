DROP TABLE IF EXISTS users, posts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(72) NOT NULL,
  city VARCHAR(256),
  join_date DATE DEFAULT NOW()
);


CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  author INTEGER REFERENCES users(id),
  city VARCHAR(256) NOT NULL,
  content TEXT
);

DROP TABLE IF EXISTS session;
CREATE TABLE session (
  sid varchar NOT NULL COLLATE "default",
	sess json NOT NULL,
	expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
