import { ethers } from "ethers";

class ZetaSwapContract {
  constructor(providerUrl, privateKey, contractAddress) {
    // Inicializar el proveedor (puede ser una URL de un RPC)
    this.provider =  new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io.infura.io/v3/${process.env.INFURA}`);

    // Inicializar la wallet con la clave privada y conectar al proveedor
    this.wallet = new ethers.Wallet(privateKey, this.provider);

    // Dirección del contrato `Swap`
    this.contractAddress = contractAddress;

    // ABI del contrato `Swap` (solo métodos relevantes)
    this.contractABI = [
      "function swap(address inputToken, uint256 amount, address targetToken, bytes recipient, bool withdraw) public"
    ];

    // Instanciar el contrato
    this.contract = new ethers.Contract(contractAddress, this.contractABI, this.wallet);
  }

  // Método para realizar el swap
  async swapTokens(inputToken, amount, targetToken, recipient, withdraw = true) {
    try {
      // Convertir el recipient a formato bytes
      const recipientBytes = ethers.utils.arrayify(recipient);

      // Ejecutar la función swap
      const tx = await this.contract.swap(
        inputToken,
        ethers.utils.parseEther(amount),
        targetToken,
        recipientBytes,
        withdraw
      );

      // Esperar a que se confirme la transacción
      await tx.wait();

      console.log(`Transacción exitosa: ${tx.hash}`);
    } catch (error) {
      console.error("Error al realizar el swap:", error);
      throw error;
    }
  }
}

export default ZetaSwapContract;
