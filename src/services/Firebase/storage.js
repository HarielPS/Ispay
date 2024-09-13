dataAdmin
dataCompany


//limpiar
removeLocalStorageItem("userUID");
clearLocalStorage();

// obtener
const [dataCompanyLocalS] = useLocalStorage(null, "dataCompany");
const [userUIDLocalS] = useLocalStorage(null, "userUID");

// un elemento
const idCompanyTax = dataCompanyLocalS.ID_company_tax; // Acceder a ID_company_tax
console.log("UID del usuario (userUID):", userUIDLocalS); // Acceder a userUID


