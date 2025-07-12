-- 1. Create ENUM type
CREATE TYPE account_type_enum AS ENUM ('Client', 'Admin');

-- 2. Create Tables
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(100) UNIQUE NOT NULL,
  account_password TEXT NOT NULL,
  account_type account_type_enum DEFAULT 'Client'
);

CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_description TEXT,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  classification_id INT REFERENCES classification(classification_id)
);

-- 3. Insert data
INSERT INTO classification (classification_name)
VALUES ('Electric'), ('Luxury'), ('Sport');

INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id)
VALUES
('Tesla', 'Model S', 'Electric luxury car', '/images/tesla.jpg', '/images/tesla-thumb.jpg', 1),
('GM', 'Hummer', 'SUV with small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 3);

-- 4. Reuse Queries from assignment2.sql (query 4 and 6)
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
