module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "orders",
  define: {
    timestamps: true,
    underscored: true,
  },
};
