require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "23627e69ff7e809ab172643b66d275b7676dcf898db59f872d65888a5e93f6f0";
const goerliApiKey = "0x54fA149EF2dF3f53752328be55bc07805DdD1277";
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {},
    goerli: {
      url: goerliApiKey,
      accounts: privateKeys.split(","),
    }
  },
};
