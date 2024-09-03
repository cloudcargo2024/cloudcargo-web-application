const express = require("express");
const path = require("path");
const dgram = require("dgram");
const app = express();

const PORT = 5000;

// Replace with your drone's IP and port
const DRONE_IP = '192.168.4.153';  // Example IP
const DRONE_PORT = 8090;          // Example port

const droneSocket = dgram.createSocket('udp4');

app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Function to create the specific takeoff packet
function createDCPPacketTakeOff() {
    const buffer = Buffer.from([0x66, 0x80, 0x80, 0x80, 0x80, 0x01, 0x01, 0x99]);
    return buffer;
}

function createDCPPacketLanding() {
    const buffer = Buffer.from([0x66, 0x80, 0x80, 0x80, 0x80, 0x02, 0x02, 0x99]);
    return buffer;
}

function createDCPPacketStop() {
    const buffer = Buffer.from([0x66, 0x80, 0x80, 0x80, 0x80, 0x04, 0x04, 0x99]);
    return buffer;
}

// Function to send the packet to the drone
function sendCommand(buffer) {
    return new Promise((resolve, reject) => {
        droneSocket.send(buffer, 0, buffer.length, DRONE_PORT, DRONE_IP, (err) => {
            if (err) {
                console.error('Error sending command:', err);
                reject(err);
            } else {
                console.log('Command sent:', buffer);
                resolve();
            }
        });
    });
}

// API Endpoints under /api/drone-flight
app.post('/api/drone-flight/takeoff', async (req, res) => {
    try {
        const packet = createDCPPacketTakeOff();  // Create the packet
        await sendCommand(packet);  // Send the packet to the drone
        res.status(200).json({ status: 'Drone is taking off' });
    } catch (error) {
        res.status(500).json({ status: 'Failed to send takeoff command', error: error.toString() });
    }
});

app.post('/api/drone-flight/land', async (req, res) => {
    try {
        const packet = createDCPPacketLanding();  // Create the packet
        await sendCommand(packet);  // Send the packet to the drone
        res.status(200).json({ status: 'Drone is landing' });
    } catch (error) {
        res.status(500).json({ status: 'Failed to send land command', error: error.toString() });
    }
});

app.post('/api/drone-flight/stop', async (req, res) => {
    try {
        const packet = createDCPPacketStop();  // Create the packet
        await sendCommand(packet);  // Send the packet to the drone
        res.status(200).json({ status: 'Emergency stop' });
    } catch (error) {
        res.status(500).json({ status: 'Failed to send stop command', error: error.toString() });
    }
});

// Serve the React app for all other requests
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
