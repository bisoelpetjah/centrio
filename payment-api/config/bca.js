/**
 * (sails.config.bca)
 */

require('dotenv').config()

module.exports.bca = {

  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_ID_SECRET: process.env.CLIENT_ID_SECRET,
  OAUTH_CREDENTIAL: process.env.OAUTH_CREDENTIAL,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  CORPORATE_ID: process.env.CORPORATE_ID,
  BUYER_ACCOUNT_ID: process.env.BUYER_ACCOUNT_ID,
  MERCHANT_ACCOUNT_ID: process.env.MERCHANT_ACCOUNT_ID,

};
