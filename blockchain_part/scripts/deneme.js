const ethers = require("ethers");
// const solc = require("solc")
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
   let private_key = process.env.PRIVATE_KEY;
   console.log(private_key);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
