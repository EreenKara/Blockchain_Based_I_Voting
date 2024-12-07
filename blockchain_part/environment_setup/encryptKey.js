const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

   const encryptedJsonKey = await wallet.encrypt(
      process.env.PRIVATE_KEY_PASSWORD, // bu 1234eren olan. wallet'ın private_key'i değil.
   );
   console.log(encryptedJsonKey);
   fs.writeFileSync("./environment_setup/.encryptedKey.json", encryptedJsonKey);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
