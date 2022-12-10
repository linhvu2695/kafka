// produce message

const Kafka = require("kafkajs").Kafka
const getIpAdress = require("./host_ip.js");
const ipAddress = getIpAdress();
const brokerPort = "9092"

const msg = process.argv[2];

run();

async function run(){
    try {
        const kafka = new Kafka({
            "clientId": "admin",
            "brokers": [ipAddress.concat(":").concat(brokerPort)]
        })
        const producer = kafka.producer();
        console.log("Connecting...")
        await producer.connect()
        console.log("Connected!")
        
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log(`Message: ${msg} - sent successfully! ${JSON.stringify(result)}`)
        await producer.disconnect()
    }
    catch(ex) {
        console.log("Error occurred.")
    }
    finally{
        process.exit(0)
    }
}