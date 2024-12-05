let baseUrl = 'http://localhost:3000/vehicle';

function display(data) {
    document.getElementById('output').innerText = JSON.stringify(data, null, 2);
}

async function getAllVehicles() {
    try {
        let response = await fetch(baseUrl);
        let data = await response.json();
        display(data);
    } catch (error) {
        display(error.message);
    }
}

async function getByVIN() {
    let vin = document.getElementById('vinGet').value;
    try {
        let response = await fetch('${baseUrl}/${vin}');
        let data = await response.json();
        display(data);
    } catch (error) {
        display(error.message);
    }
}

document.getElementById('addVehicle').addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let vehicleData = Object.fromEntries(formData.entries());
    try {
        console.log(vehicleData);
        let response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicleData),
        });

        if (!response.ok) {
            let errorText = await response.text();
            throw Error('${response.status} - ${errorText}');
        }

        let data = await response.json();
        display(data);
    } catch (error) {
        console.error(error.message);
        display(error.message);
    }
});

async function deleteVehicle() {
    let vin = document.getElementById('vinDel').value;
    try {
        let response = await fetch('${baseUrl}/${vin}', { method: 'DELETE' });
        if (response.status === 204) {
            display('Successfully deleted vehicle');
        } else {
            let data = await response.json();
            display(data);
        }
    } catch (error) {
        display(error.message);
    }
}