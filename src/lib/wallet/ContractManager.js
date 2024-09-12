import { ethers } from "ethers";

class ContractManager {
  constructor(privateKey) {
    this.provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io.infura.io/v3/${process.env.INFURA}`
    );
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = null;
  }

  compileContract() {}

  initContract() {
    //After the contract is compiled
    this.contract = new ethers.Contract();
  }
  async sendTransaction(arg1, arg2) {
    try {
      const tx = await this.contract.someWriteFunction(arg1, arg2);
      await tx.wait(); // Esperar confirmación
      console.log("Transacción confirmada:", tx.hash);
      return tx;
    } catch (error) {
      console.error("Error en la transacción:", error);
      throw error;
    }
  }
  async signAndSendTransaction(to, amount) {
    try {
      const tx = {
        to,
        value: ethers.utils.parseEther(amount.toString()), // Convertir el monto a Wei
      };

      const signedTx = await this.wallet.sendTransaction(tx);
      await signedTx.wait();
      console.log("Transacción enviada:", signedTx.hash);
      return signedTx;
    } catch (error) {
      console.error("Error al enviar la transacción:", error);
      throw error;
    }
  } // Método para obtener el estado del contrato (si tiene funciones adicionales)
  async getContractState() {
    try {
      const state = await this.contract.getState(); // Método de ejemplo
      return state;
    } catch (error) {
      console.error("Error al obtener el estado del contrato:", error);
      throw error;
    }
  }
}

export default ContractManager;
