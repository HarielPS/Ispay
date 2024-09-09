import Wallet from "@/lib/wallet/Wallet.lib";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import {db} from "../Firebase"

export default class EmployeeAccount {
  static methods = {};
  constructor(EmployeeInformation, wallet = null) {
    this.ID_company_tax = EmployeeInformation.ID_company_tax;
    this.ID_FB = EmployeeInformation.ID_FB || "";
    this.ID_user = EmployeeInformation.ID_user;
    this.name = EmployeeInformation.name;
    this.surname = EmployeeInformation.surname;
    this.last_signin = EmployeeInformation.last_signin || null;
    this.last_movement = EmployeeInformation.last_movement || null; //Aqui meter otra coleccion
    this.image = EmployeeInformation.image || "";
    this.wallet = new Wallet(
      wallet?.address,
      wallet?.privateKey,
      wallet?.balance
    );
    this.work_location = EmployeeInformation.work_location || "";
    this.role = EmployeeInformation.role;
    //Datos relacionados con filtros para su wallet
    this.min_amount_account = EmployeeInformation.min_amount_account;
    this.max_amount_account = EmployeeInformation.max_amount_account;
    this.start_withdraw_account = EmployeeInformation.start_withdraw_account;
    this.final_withdraw_account = EmployeeInformation.final_withdraw_account;
    this.days_account = EmployeeInformation.days_account;
    this.expense_category_account =
      EmployeeInformation.expense_category_account;
  }
  toJSON() {
    return {
      ID_company_tax: this.ID_company_tax,
      ID_FB: this.ID_FB,
      ID_user: this.ID_user,
      name: this.name,
      surname: this.surname,
      last_signin: this.last_signin,
      last_movement: this.last_movement,
      image: this.image,
      wallet: {
        address: this.wallet.address,
        privateKey: this.wallet.privateKey,
        balance: this.wallet.balance,
      },
      work_location: this.work_location,
      role: this.role,
      min_amount_account: this.min_amount_account,
      max_amount_account: this.max_amount_account,
      start_withdraw_account: this.start_withdraw_account,
      final_withdraw_account: this.final_withdraw_account,
      days_account: this.days_account,
      expense_category_account: this.expense_category_account,
    };
  }

  async FB_createUser(idCompany){
    //Registrara datos del empleado
    const userEmployeeData = this.toJSON();
    try {
      
    } catch (error) {
      
    }
  }
}
