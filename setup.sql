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
    fueltype VARCHAR(50) NOT NULL
);

INSERT INTO records (vin, manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype) VALUES ('1HGCM82633A123456', 'Honda', 'Sedan, 4-door, comfortable and fuel-efficient', 200, 'Accord', 2023, 30000.00, 'Gasoline');
INSERT INTO records (vin, manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype) VALUES ('2C3CDZBT5KH556789', 'Dodge', 'Muscle car with powerful engine', 450, 'Challenger R/T', 2020, 35000.50, 'Gasoline');