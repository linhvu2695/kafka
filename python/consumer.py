import kafka
import logging

logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.INFO)
brokerPort = "9092"


consumer = kafka.KafkaConsumer(
    'Users',
    bootstrap_servers=["127.0.0.1:" + brokerPort],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='test',
    value_deserializer=lambda x: x.decode('utf-8')
)

for message in consumer:
    logging.info(f'offset={message.offset}, key={message.key}, value={message.value}')
