let express = require("express");
let { Pool } = require("pg");
let env = require("../env.json");
let hostname = "localhost";
let port = 3000;
let app = express();
let pool = new Pool(env);

app.use(express.json());
app.use(express.static("public"));

pool.connect().then(() => {
    console.log("Connected to database");
});


// get all vehicles
app.get("/vehicle", async (req, res) => {
    pool.query("SELECT * FROM records")
        .then(result => {
            res.status(200).json(result.rows);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error.message);
        });
});

// add vehicle
app.post("/vehicle", async (req, res) => {
    let { manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype } = req.body;

    if (manufacturer === undefined || description === undefined || horsepower === undefined || modelname === undefined || modelyear === undefined || purchaseprice === undefined || fueltype === undefined) {
        return res.status(400).json("Missing fields");
    }

    let uniqueID = Math.random().toString(36).substring(2, 15);

    pool.query("INSERT INTO records (vin, manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [uniqueID, manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype])
        .then(result => {
            let newRecord = result.rows[0];
            console.log(newRecord);
            res.status(201).json('Created');
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

// get vehicle by vin
app.get("/vehicle/:vin", async (req, res) => {
    let { vin } = req.params;

    pool.query("SELECT * FROM records WHERE vin = $1", [vin])
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).json("Vehicle not found");
            } else {
                res.status(200).json(result.rows[0]);
            }
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

// update vehicle by vin
app.put("/vehicle/:vin", async (req, res) => {
    let { vin } = req.params;
    let { manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype } = req.body;
    let variables = { manufacturer, description, horsepower, modelname, modelyear, purchaseprice, fueltype };

    let attributes = [];
    let values = [];

    for (const [key, value] of Object.entries(updateData)) {
        if (value !== undefined) {
          fields.push(`${key} = $${index++}`);
          values.push(value);
        }
    }
    values.push(vin);

    let query = `UPDATE records SET ${fields.join(", ")} WHERE vin = $${index}`;
    pool.query(query, values)
    .then(result => {
        if (result.rowCount === 0) {
            res.status(404).json("Vehicle not found");
        } else {
            res.status(200).json(result.rows[0]);
        }
    })
    .catch(error => {
        res.status(500).json(error.message);
    });
});

// delete vehicle by vin
app.delete("/vehicle/:vin", async (req, res) => {
    let { vin } = req.params;

    pool.query("DELETE FROM records WHERE vin = $1", [vin])
        .then(result => {
            if (result.rowCount.length === 0) {
                res.status(404).json("Vehicle not found");
            } else {
                res.status(204);
            }
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});