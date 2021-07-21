const { Kafka } = require("kafkajs");

module.exports = {
  async producer(topicName, event) {
    console.log("[Stream] Sending data......");
    try {
      const kafka = new Kafka({
        clientId: "kafka",
        brokers: ["kafka:29092"],
      });

      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
        topic: topicName,
        messages: [{ value: JSON.stringify(event) }],
      });
      console.log("[Stream] Data sended.");
    } catch (error) {
      console.log(error);
    }
    await producer.disconnect();
  },

  TOPICS: {
    ORDERS: "topic-orders",
  },
  EVENTS: {
    ORDER_CREATED: "order-created",
  },
};
