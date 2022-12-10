// get localhost ip address

function getIpAdress() {
    const os = require("os");
    const interfaces = os.networkInterfaces();
    let ipAddress;
    for (let interface of Object.values(interfaces)) {
        for (let i of interface) {
            if (i.family === 'IPv4' && !i.internal) {
            ipAddress = i.address;
            break;
            }
        }
    }
    return ipAddress
}

module.exports = getIpAdress;