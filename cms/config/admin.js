const environment = process.env;

module.exports = () => ({
  auth: {
    secret: environment.ADMIN_JWT_SECRET,
  },
  apiToken: {
    salt: environment.API_TOKEN_SALT,
  },
  transfer: {
    token: {
      salt: environment.TRANSFER_TOKEN_SALT,
    },
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
});
