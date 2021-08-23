const paymentController = {
  async store(req, res) {
    console.log("Payment processed!");
    return res.json("Payment processes.");
  },
};

module.exports = paymentController;
