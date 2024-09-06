import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const FBQueries = {};

FBQueries.SignupCompany = async (companyData, userData) => {
  const docID = companyData.ID_company_tax;
  try {
    // Crear referencia al documento de la empresa
    const docRef = doc(db, "EMPRESAS", docID);
    await setDoc(docRef, {});

    // Agregar la colección de usuarios dentro del documento de empresa creado
    const userCollectionRef = collection(db, "EMPRESAS", docID, "USUARIO");
    await addDoc(userCollectionRef, userData);

    // Agregar la colección de empresa dentro del documento de empresa creado
    const empresaCollectionRef = collection(db, "EMPRESAS", docID, "EMPRESA");
    await addDoc(empresaCollectionRef, companyData);

    return {
      success: true,
      message: "Empresa y usuario registrados correctamente",
    };
  } catch (error) {
    console.log("Error al crear el documento: ", error);

    return {
      success: false,
      message: `Error al registrar la empresa: ${error.message}`,
    };
  }
};
