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
};
