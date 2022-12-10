import kafka
import logging

logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.INFO)
brokerPort = "9092"

try:
    admin = kafka.KafkaAdminClient(
        bootstrap_servers="127.0.0.1:" + brokerPort, 
        client_id="admin"
    )
    logging.info("Connect successfully!")

    # create topic
    topics = []
    topics.append(kafka.admin.NewTopic(
        name = "Users",
        num_partitions=2,
        replication_factor=1
    ))

    admin.create_topics(topics)
    logging.info(f"Topic created.")

    # delete topic
    # admin.delete_topics(topics=["Users"])
    # logging.info("Topic deleted.")
except Exception as e:
    logging.error(e)