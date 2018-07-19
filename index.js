function generateAddressesFromSeed(seed, count) {
  let bip39 = require("bip39");
  let hdkey = require('ethereumjs-wallet/hdkey');
  let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
  let wallet_hdpath = "m/44'/60'/0'/0/";

  let accounts = [];
  for (let i = 0; i < count; i++) {

    let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    let address = '0x' + wallet.getAddress().toString("hex");
    let privateKey = wallet.getPrivateKey().toString("hex");
    accounts.push({address: address, privateKey: privateKey});
  }

  return accounts;
}



console.log(generateAddressesFromSeed("spend lamp medal similar primary verify scheme observe place coconut detect nephew", 2))