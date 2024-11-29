const express = require("express");
const path = require("path");
const dgram = require("dgram");
const app = express();

const PORT = 5000;

//Drone packets

const DefaultPacket = [0x66, 0x80, 0x80, 0x80, 0x80, 0x00, 0x00, 0x99];
const TakeOffPacket = [0x66, 0x80, 0x80, 0x80, 0x80, 0x01, 0x01, 0x99];
const LandPacket = [0x66, 0x80, 0x80, 0x80, 0x80, 0x02, 0x02, 0x99];
const StopPacket = [0x66, 0x80, 0x80, 0x80, 0x80, 0x04, 0x04, 0x99];

const AppStartPacket = [0xaa, 0x80, 0x80, 0x00, 0x80, 0x00, 0x80, 0x55];

///TO BE TESTED !!!
const UpPacket = [0x66, 0x80, 0x80, 0xac, 0x80, 0x00, 0x80, 0x99];
const DownPacket = [0x66, 0x80, 0x80, 0x00, 0x80, 0x00, 0x80, 0x99];
const RotateLeftPacket = [0x66, 0x80, 0x80, 0x80, 0x00, 0x00, 0x80, 0x99];
const RotateRightPacket = [0x66, 0x80, 0x80, 0x80, 0xff, 0x00, 0x80, 0x99];
const ForwardPacket = [0x66, 0x80, 0xff, 0x80, 0x80, 0x00, 0x80, 0x99];
const BackPacket = [0x66, 0x80, 0x00, 0x80, 0x80, 0x00, 0x80, 0x99];
const LeftPacket = [0x66, 0x00, 0x80, 0x80, 0x80, 0x00, 0x80, 0x99];
const RightPacket = [0x66, 0xff, 0x80, 0x80, 0x80, 0x00, 0x80, 0x99];


const DRONE_IP = '192.168.4.153';  // Drone IP
const DRONE_PORT = 8090;          // Drone port

const droneSocket = dgram.createSocket('udp4');

app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

function createDCPPacket(packet){
    const buffer = Buffer.from(packet);
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

const handleDroneCommand =  async (res, packetType, successMessage, errorMessage) => {
    try {
        const packet = createDCPPacket(packetType);  // Create the packet
        await sendCommand(packet);  // Send the packet to the drone
        res.status(200).json({ status: successMessage });
    } catch (error) {
        res.status(500).json({ status: errorMessage, error: error.toString() });
    }
}



app.post('/api/drone-flight/default', async (req, res) => {
    await handleDroneCommand(res, DefaultPacket, 'Drone is waiting', 'Failed to send default packet');
 });

 app.post('/api/drone-flight/appstart', async (req, res) => {
    await handleDroneCommand(res, AppStartPacket, 'App start packet sent', 'Failed to send app start packet');
 });

app.post('/api/drone-flight/takeoff', async (req, res) => {
   await handleDroneCommand(res, TakeOffPacket, 'Drone is taking off', 'Failed to send takeoff packet');
});

app.post('/api/drone-flight/land', async (req, res) => {
    await handleDroneCommand(res, LandPacket, 'Drone is landing', 'Failed to send land command');
});

app.post('/api/drone-flight/stop', async (req, res) => {
    await handleDroneCommand(res, StopPacket, 'Emergency stop', 'Failed to send stop command');
});

app.post('/api/drone-flight/up', async (req, res) => {
    await handleDroneCommand(res, UpPacket, 'Going up', 'Failed to send up command');
});

app.post('/api/drone-flight/down', async (req, res) => {
    await handleDroneCommand(res, DownPacket, 'Going down', 'Failed to send down command');
});

app.post('/api/drone-flight/rotateright', async (req, res) => {
    await handleDroneCommand(res, RotateRightPacket, 'Rotating right', 'Failed to send rotate right command');
});

app.post('/api/drone-flight/rotateleft', async (req, res) => {
    await handleDroneCommand(res, RotateLeftPacket, 'Rotating left', 'Failed to send rotate left command');
});

app.post('/api/drone-flight/forward', async (req, res) => {
    await handleDroneCommand(res, ForwardPacket, 'Going forward', 'Failed to send forward command');
});

app.post('/api/drone-flight/back', async (req, res) => {
    await handleDroneCommand(res, BackPacket, 'Going back', 'Failed to send back command');
});

app.post('/api/drone-flight/left', async (req, res) => {
    await handleDroneCommand(res, LeftPacket, 'Going left', 'Failed to send left command');
});

app.post('/api/drone-flight/right', async (req, res) => {
    await handleDroneCommand(res, RightPacket, 'Going right', 'Failed to send right command');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
