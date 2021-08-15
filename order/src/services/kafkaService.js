const { Kafka } = require("kafkajs");
const config = require("../config");

module.exports = {
  async consumer(groupId, topic) {
    console.log(`[Stream] Initialize stream consumer on topic: ${topic}`);

    try {
      const kafka = new Kafka({
        clientId: config.Kafka.Client,
        brokers: config.Kafka.Brokers,
      });

      const consumer = kafka.consumer({ groupId: groupId });

      await consumer.connect();
      await consumer.subscribe({
        topic: topic,
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

  async producer(topic, message) {
    console.log("[Stream] Sending data......");

    try {
      const kafka = new Kafka({
        clientId: config.Kafka.Client,
        brokers: config.Kafka.Brokers,
      });

      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      await producer.disconnect();
      console.log("[Stream] Data sended.");
    } catch (error) {
      console.log(`[Stream] ERROR: ${error} `);
    }
  },

  async consumer(groupId, topics, callback) {
    try {
      const kafka = new Kafka({
        clientId: config.Kafka.Client,
        brokers: config.Kafka.Brokers,
      });

      const consumer = kafka.consumer({ groupId: groupId });
      await consumer.connect();

      topics.forEach(async (topic) => {
        console.log(`[Stream] Initialize stream consumer on topic: ${topic}`);

        await consumer.subscribe({
          topic: topic,
          fromBeginning: true,
        });
      });

      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          callback(topic, message.value.toString());
        },
      });
    } catch (error) {
      console.log(`[Stream] ERROR: ${error} `);
    }
  },
};
