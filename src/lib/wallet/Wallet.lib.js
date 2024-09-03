import { ethers } from "ethers";

class Wallet {
  static methods = {};
  constructor() {}
}

Wallet.methods.createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  const address = wallet.address;
  const privateKey = wallet.privateKey;
  return {
    address,
    privateKey,
  };
};

export default Wallet;
