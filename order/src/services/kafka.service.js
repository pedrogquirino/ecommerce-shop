const { Kafka } = require("kafkajs");
const config = require("../config");

module.exports = {
  async consumer(consumerGroupId, consumerTopic) {
    console.log(
      `[Stream] Initialize stream consumer on topic: ${consumerTopic}`
    );

    try {
      const kafka = new Kafka({
        clientId: config.Kafka.Client,
        brokers: config.Kafka.Brokers,
      });

      const consumer = kafka.consumer({ groupId: consumerGroupId });

      await consumer.connect();
      await consumer.subscribe({
        topic: consumerTopic,
        fromBeginning: true,
      });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          });
        },
      });
    } catch (error) {
      console.log(`[Stream] ERROR: ${error} `);
    }
  },
  async producer(topicName, eventType, data) {
    console.log("[Stream] Sending data......");
    const event = { eventType, data };

    try {
      const kafka = new Kafka({
        clientId: config.Kafka.Client,
        brokers: config.Kafka.Brokers,
      });

      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
        topic: topicName,
        messages: [{ value: JSON.stringify(event) }],
      });
      await producer.disconnect();
      console.log("[Stream] Data sended.");
    } catch (error) {
      console.log(`[Stream] ERROR: ${error} `);
    }
  },
};
