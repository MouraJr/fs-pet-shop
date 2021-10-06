DROP DATABASE IF EXISTS petshop;

CREATE DATABASE petshop;

\c petshop

DROP TABLE IF EXISTS pet CASCADE;

CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INTEGER,
    kind VARCHAR(50)
);

INSERT INTO pet (
        name,
        age, 
        kind
    ) VALUES (
        'archstone',
        33,
        'bear'
);

INSERT INTO pet (
        name,
        age, 
        kind
    ) VALUES (
        'Bob',
        12,
        'Dog'
);

INSERT INTO pet (
        name,
        age, 
        kind
    ) VALUES (
        'Snow',
        5,
        'Polar'
);

INSERT INTO pet (
        name,
        age, 
        kind
    ) VALUES (
        'Dan',
        1,
        'Aligator'
);
