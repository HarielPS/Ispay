import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default class User {
  static methods = {};
  constructor(UserInformation) {
    this.ID_company_tax = UserInformation.ID_company_tax;
    this.ID_FB = UserInformation.ID_FB || "";
    this.ID_user = UserInformation.ID_user;
    this.name = UserInformation.name;
    this.surname = UserInformation.surname;
    this.ssn = UserInformation.ssn;
    this.work_email = UserInformation.work_email;
    this.role = UserInformation.role;
    this.ADMIN = UserInformation.ADMIN;

    this.image = UserInformation.image || "";
    this.password = UserInformation.password | ""; //Password.methods.hashData(UserInformation.password);
    this.phone_number = UserInformation.phone_number || "";
    this.work_location = UserInformation.work_location || "";
  }
  toJSON() {
    return {
      ID_company_tax: this.ID_company_tax,
      ID_FB: this.ID_FB,
      ID_user: this.ID_user,
      name: this.name,
      surname: this.surname,
      ssn: this.ssn,
      work_email: this.work_email,
      role: this.role,
      ADMIN: this.ADMIN,
      image: this.image,
      password: this.password,
      phone_number: this.phone_number,
      work_location: this.work_location,
    };
  }

  async FB_createUser() {
    const userData = this.toJSON();
    const docID = this.ID_company_tax;
    try {
      const UserRef = collection(db, "EMPRESAS", docID, "USUARIO");
      await addDoc(UserRef, userData);
      return {
        success: true,
        message: "User registrado correctamente",
      };
    } catch (error) {
      console.log("Error al crear el documento: ", error);
      return {
        success: false,
        message: `Error al registrar el usuario ${error.message}`,
      };
    }
  }
}
