import User from "./User";
//import Password from "@/lib/bcrypt/Bcrypt.lib";
import { FBQueries } from "../Firebase.queries";
import Wallet from "@/lib/wallet/Wallet.lib";

export default class Company {
  constructor(companyInformation, wallet = null) {
    this.ID_company_tax = companyInformation.ID_company_tax;
    this.company_name = companyInformation.company_name;
    this.legal_company_name = companyInformation.legal_company_name;
    this.company_headquarters = companyInformation.company_headquarters;
    this.website = companyInformation.website;
    this.number_employees = companyInformation.number_employees;
    this.company_role = companyInformation.company_role;
    this.company_description = companyInformation.company_description;
    this.wallet = new Wallet(
      wallet?.address,
      wallet?.privateKey,
      wallet?.balance
    );
  }

  async signup(User) {
    try {
      const companyData = this.toJSON();
      const response = await FBQueries.SignupCompany(companyData, User);
      // Verificar si la respuesta fue exitosa
      if (response.success) {
        console.log(response.message); // Puedes también mostrar un mensaje de éxito en la UI
        return true; // Indicar que todo fue bien
      } else {
        console.error(response.message); // Manejar error si algo salió mal
        return false; // Indicar que algo salió mal
      }
    } catch (error) {
      console.error("Error en el proceso de signup:", error);
      return false;
    }
  }

  toJSON() {
    return {
      ID_company_tax: this.ID_company_tax,
      company_name: this.company_name,
      legal_company_name: this.legal_company_name,
      company_headquarters: this.company_headquarters,
      website: this.website,
      number_employees: this.number_employees,
      company_role: this.company_role,
      company_description: this.company_description,
      wallet: {
        address: this.wallet.address,
        privateKey: this.wallet.privateKey,
        balance: this.wallet.balance,
      },
    };
  }
}
