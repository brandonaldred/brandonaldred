module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '30762e73a8dbb1b6e6512b7ada8c5533'),
  },
});
