import User from "./User";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
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

  async FB_createCompany(joinUserInformation) {
    const user = new User(joinUserInformation);
    const companyData = this.toJSON();
    const docID = this.ID_company_tax;
    try {
      // Crear referencia al documento de la empresa
      const docRef = doc(db, "EMPRESAS", docID);
      await setDoc(docRef, {});
      const companyRef = collection(db, "EMPRESAS", docID, "EMPRESA");
      await addDoc(companyRef, companyData);
      // Crear o registrar el usuario
      const userResponse = await user.FB_createUser();
      if (!userResponse.success) {
        throw new Error(userResponse.message); // Lanzar error si el usuario no se crea correctamente
      }
      return {
        success: true,
        message: "Company registrada correctamente",
      };
    } catch (error) {
      console.log("Error al crear el documento: ", error);
      return {
        success: false,
        message: `Error al registrar la empresa ${error.message}`,
      };
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
