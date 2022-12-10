// create topic

const Kafka = require("kafkajs").Kafka

run();

async function run(){
    try {
        const kafka = new Kafka({
            "clientId": "admin",
            "brokers": ["192.168.50.42:9092"]
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