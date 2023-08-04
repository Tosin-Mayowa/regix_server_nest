export default () => ({
  app_port: parseInt(process.env.APP_PORT, 10) || 5000,
  secret: process.env.JWT_SECRET,
});