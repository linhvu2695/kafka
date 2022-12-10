// consume message

const Kafka = require("kafkajs").Kafka


run();

async function run(){
    try {
        const kafka = new Kafka({
            "clientId": "admin",
            "brokers": ["192.168.50.42:9092"]
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