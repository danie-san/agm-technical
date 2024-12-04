DROP DATABASE IF EXISTS vehicles;
CREATE DATABASE vehicles;
\c vehicles;

CREATE TABLE records (
    vin VARCHAR(17) PRIMARY KEY, /* needs to be case sensitive */
    manufacturer VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    horsepower INT NOT NULL,
    modelname VARCHAR(50) NOT NULL,
    modelyear INT NOT NULL,
    purchaseprice DECIMAL(10, 2) NOT NULL,
    fueltype VARCHAR(50) NOT NULL,
)