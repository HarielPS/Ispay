//import Password from "@/lib/bcrypt/Bcrypt.lib";

export default class User {
  static methods = {};
  constructor(generalUserInformation, userSafetyInfo) {
    this.ID_FB = generalUserInformation.ID_FB || "";
    this.ID_user = generalUserInformation.ID_user;
    this.name = generalUserInformation.name;
    this.surname = generalUserInformation.surname;
    this.ssn = generalUserInformation.ssn;
    this.work_email = generalUserInformation.work_email;
    this.role = generalUserInformation.role;
    this.ADMIN = generalUserInformation.ADMIN;

    this.image = userSafetyInfo.image;
    this.password = userSafetyInfo.password; //Password.methods.hashData(userSafetyInfo.password);
    this.phone_number = userSafetyInfo.phone_number;
    this.work_location = userSafetyInfo.work_location;
  }
  toFirebase() {
    return {
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
}
