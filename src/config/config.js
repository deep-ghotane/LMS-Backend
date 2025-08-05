export const config = {
  port: process.env.PORT || 4000,
  mongoOptions: {
    url: process.env.MONGO_URL || "mongodb://localhost:27012/lms-db",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.JWT_EXPIRESIN || "7d",
  },
};
