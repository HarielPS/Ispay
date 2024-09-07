//import Password from "@/lib/bcrypt/Bcrypt.lib";

export default class Admin {
    static methods = {};
    constructor(generalUserInformation, ) {
      this.ID_user = generalUserInformation.ID_user;
      this.name = generalUserInformation.name;
      this.surname = generalUserInformation.surname;
      this.role = generalUserInformation.role;
      this.ADMIN = generalUserInformation.ADMIN;
      this.image = generalUserInformation.image;

    }
    toFirebase() {
      return {
        ID_user: this.ID_user,
        name: this.name,
        surname: this.surname,
        role: this.role,
        ADMIN: this.ADMIN,
        image: this.image,
      };
    }
  }
  