// consume message

const Kafka = require("kafkajs").Kafka
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
        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting...")
        await consumer.connect()
        console.log("Connected!")

        consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received message ${result.message.value} on partition ${result.partition}`)
            }
        })
    }
    catch(ex) {
        console.log("Error occurred.")
    }
    finally{
        
    }
}