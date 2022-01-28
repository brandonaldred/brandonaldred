module.exports = ({ env }) => ({
  host: env('HOST', '192.168.50.157'),
  port: env.int('PORT', 4000),
});
