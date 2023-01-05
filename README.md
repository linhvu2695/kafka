 # Kafka Tutorial

## Set up Kafka with Docker
Kafka distributed system is managed by Zookeeper. Therefore, it is necessary to run these 2 instances together.
- Create `docker-compose` yml file with following environment variables to properly connect to Zookeeper and setup Kafka cluster
```
// docker-compose.yml
environment:
- KAFKA_ZOOKEEPER_CONNECT=${HOST_IP}:2181
- KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://${HOST_IP}:9092
- KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
```
- Run the following command to spin up a Zookeeper instance & a Kafka instance
```
HOST_IP=$(ipconfig getifaddr en0) && docker-compose up -d
```

## Use Kafka with Nodejs
- `node topic.js` to spin up a topic named "Users"
- `node producer.js <username>` to produce/push message to the topic (with proper partitioning). 
```
// producer.js
const partition = msg[0] < "N" ? 0 : 1;
```
- `node consumer.js` to spin up consumer to start consume any message in the topic until the last offset. 
- We can create multiple consumers and form a consumer group. Each partition will be consumed by only 1 consumer (within a consumer group)
```
// consumer.js
const consumer = kafka.consumer({"groupId": "test"});
```

## Use Kafka with Python
- All the above steps are applicable with python scripts, using `topic.py`, `producer.py`, `consumer.py`