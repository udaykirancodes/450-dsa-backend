module.exports = {
  PORT: process.env.PORT,
  MONGO_DB: {
    url: process.env.MONGO_URL,
    options: {},
  },
  JWT: process.env.JWT_SECRET,
  EMAIL: {
    ID: process.env.EMAIL,
    PASS: process.env.APP_PASSWORD,
  },
  FRONTEND_URL: process.env.FRONTEND_URL,
};
