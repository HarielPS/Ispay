import Wallet from "@/lib/wallet/Wallet.lib";

export default class Employee {
  static methods = {};
  constructor(EmployeeInformation, wallet = null) {
    this.ID_user = EmployeeInformation.ID_user;
    this.name = EmployeeInformation.name;
    this.surname = EmployeeInformation.surname;
    this.last_signin = EmployeeInformation.last_signin;
    this.last_movement = EmployeeInformation.last_movement; //Aqui meter otra coleccion
    this.image = EmployeeInformation.image;
    this.wallet = new Wallet(
      wallet?.address,
      wallet?.privateKey,
      wallet?.balance
    );
    this.role = EmployeeInformation.role;

    this.work_location = EmployeeInformation.work_location;
  }
  toFirebase() {
    return {
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
      wallet: {
        address: this.wallet.address,
        privateKey: this.wallet.privateKey,
        balance: this.wallet.balance,
      },
    };
  }
}
