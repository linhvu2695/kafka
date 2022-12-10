// create topic

const Kafka = require("kafkajs").Kafka;
const getIpAdress = require("./host_ip.js");
const ipAddress = getIpAdress();
const brokerPort = "9092"

run();

async function run(){
    try {
        const kafka = new Kafka({
            "clientId": "admin",
            "brokers": [ipAddress.concat(":").concat(brokerPort)]
        })
        const admin = kafka.admin();
        console.log("Connecting...")
        await admin.connect()
        console.log("Connected!")

        // Partition by A-M and N-Z
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log("Topic created.")
        await admin.disconnect()
    }
    catch(ex) {
        console.log("Error occurred.")
    }
    finally{
        process.exit(0)
    }
}