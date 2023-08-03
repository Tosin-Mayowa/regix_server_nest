// I have not use this, what I am currently using is in the App module importing directly from env file

export default () => ({
    //process.env is a string so I am changing it to number
  port: parseInt(process.env.APP_PORT, 10) || 5000,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});