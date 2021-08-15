const { Kafka } = require("kafkajs");
const config = require("../config");
const PaymentService = require("../services/paymentService");

module.exports = {
  async consumer(consumerGroupId, topics, callback) {
    try {
      const kafka = new Kafka({
        clientId: config.Kafka.Client,
        brokers: config.Kafka.Brokers,
      });

      const consumer = kafka.consumer({ groupId: consumerGroupId });
      await consumer.connect();

      topics.forEach(async (topic) => {
        console.log(`[Stream] Initialize stream consumer on topic: ${topic}`);

        await consumer.subscribe({
          topic: topic,
          fromBeginning: true,
        });
      });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          callback(topic, message.value.toString());
        },
      });
    } catch (error) {
      console.log(`[Stream] ERROR: ${error} `);
    }
  },
};
