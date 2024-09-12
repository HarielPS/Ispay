import { ethers } from "ethers"

class ContractManager {
    constructor(privateKey){
        this.provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io.infura.io/v3/${process.env.INFURA}`);
        this.wallet = new ethers.Wallet(privateKey, this.provider);
        this.contract = null;
    }

    compileContract(){

    }

    initContract(){ //After the contract is compiled
        this.contract = new ethers.Contract()
    }
}

export default ContractManager;
