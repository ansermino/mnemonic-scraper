let bip39 = require("bip39");
let hdkey = require('ethereumjs-wallet/hdkey');
let fetch = require('node-fetch')

const API_TOKEN = 'E2USWIG8ZBM5TNC5KRBNR5791FER39P657'
const MULTI_ADDRESS_BALANCE = `https://api.etherscan.io/api?module=account&action=balancemulti&address=<addresses>&tag=latest&apikey=${API_TOKEN}`

const generateAddressesFromSeed = (seed, count) => {

  let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
  let wallet_hdpath = "m/44'/60'/0'/0/";

  let accounts = [];
  for (let i = 0; i < count; i++) {

    let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    let address = '0x' + wallet.getAddress().toString("hex");
    let privateKey = wallet.getPrivateKey().toString("hex");
    accounts.push({address: address, privateKey: privateKey});
    console.log(`Found: {address: ${address}, privateKey: ${privateKey}}`)
  }

  return accounts;
}

const lookupAddresses = (addresses) => {

  let addressesToQuery = []

  addresses.map((addr, i) => {
    // Grab address
    addressesToQuery.push(addr.address)
  })
  // Construct query
  let query = MULTI_ADDRESS_BALANCE.replace('<addresses>', addressesToQuery.join(','))
  console.log(`Querying: ${query}`)
  fetch(query).then((res) => {
    return res.json()
  }).then((json) => {
    console.log(json)
  }).catch((err) => {
    console.log(err)
    process.exit(1)
  })

}

console.log(lookupAddresses(generateAddressesFromSeed("spend lamp medal similar primary verify scheme observe place coconut detect nephew", 2)))