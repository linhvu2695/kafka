import kafka
import sys
import logging

logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.INFO)
brokerPort = "9092"

try:
    producer = kafka.KafkaProducer(
        bootstrap_servers=["127.0.0.1:" + brokerPort], 
        client_id="admin"
    )

    # produce message
    if len(sys.argv) > 1:
        messages = sys.argv[1:]
        for msg in messages:
            partition = 0 if msg[0] < "N" else 1
            logging.info(f"Sending message {msg} to partition {partition}")
            result = producer.send(
                topic="Users",
                value=msg.encode(),
                partition=partition
            )
    # send() do not immediately push the message but rather batch them and wait
    # without flush(), the app will exit before the messages can be pushed
    producer.flush()
    
except Exception as e:
    logging.error(e)