import { ethers } from "ethers";

class Wallet {
  constructor(address = null, privateKey = null, balance = null) {
    if (address && privateKey) {
      this.address = address;
      this.privateKey = privateKey;
      this.balance = balance !== null ? balance : 0; // Balance 0 si no se proporciona
    } else {
      const { address: newAddress, privateKey: newPrivateKey } =
        this.createWallet();
      this.address = newAddress;
      this.privateKey = newPrivateKey;
      this.balance = 0; // Balance por defecto para nuevas wallets
    }
  }
  // Generar nueva wallet
  createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  };
}

export default Wallet;
