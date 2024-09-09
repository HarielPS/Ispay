import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";


export const FBQueries = {};

FBQueries.SignupCompany = async (companyData, userSafetyInfo, userData, companyImageFile, userImageFile) => {
  const docID = companyData.ID_company_tax;
  console.log("Company fire info: ", companyData); // Agrega este log para verificar los datos

   // Verifica el valor de docID antes de usarlo
   console.log("docID: ", docID);

   if (!docID) {
     console.error("Error: docID es indefinido. Verifica que companyData.ID_company_tax esté definido.");
     throw new Error("El ID de la empresa (ID_company_tax) es obligatorio.");
   }
  const storage = getStorage(); 

  try {
    let companyImageUrl = "";
    let userImageUrl = "";

    // Subir la imagen de la empresa si está disponible
    if (companyImageFile) {
      const companyImageRef = ref(storage, `EMPRESAS/${docID}/EMPRESA/${companyData.company_name}/company_image.jpg`);
      await uploadBytes(companyImageRef, companyImageFile);  // Subir el archivo de imagen
      companyImageUrl = await getDownloadURL(companyImageRef);  // Obtener la URL de descarga
      companyData.company_image = companyImageUrl;  // Actualizar la URL de la imagen en los datos de la empresa
    }

    // Subir la imagen del usuario si está disponible
    if (userImageFile) {
      const userImageRef = ref(storage, `EMPRESAS/${docID}/USUARIO/${userData.ID_user}/profile_image.jpg`);
      await uploadBytes(userImageRef, userImageFile);  // Subir el archivo de imagen
      userImageUrl = await getDownloadURL(userImageRef);  // Obtener la URL de descarga
      userData.image = userImageUrl;  // Actualizar la URL de la imagen en los datos del usuario
    }

    // Combinar userData y userSafetyInfo antes de subir
    // const combinedUserData = {
    //   ...userData,
    //   ...userSafetyInfo,  // Combinar los campos de seguridad con los datos del usuario
    // };
    const { password_validation, ...cleanedUserSafetyInfo } = userSafetyInfo;

    const combinedUserData = {
      ...userData,
      ...cleanedUserSafetyInfo,  // Combina los campos de seguridad excepto password_validation
    };

    // Guardar los datos del usuario en Firestore
    const userCollectionRef = collection(db, "EMPRESAS", docID, "USUARIO");
    await addDoc(userCollectionRef, combinedUserData);

    // Guardar los datos de la empresa
    const empresaCollectionRef = collection(db, "EMPRESAS", docID, "EMPRESA");
    await addDoc(empresaCollectionRef, companyData);

    return {
      success: true,
      message: "Empresa y usuario registrados correctamente",
    };
  } catch (error) {
    console.log("Error al crear el documento: ", error);
    console.log("Error al crear el documento en Firestore", error.message, {
      docID, companyData, userData, userSafetyInfo, companyImageFile, userImageFile
    });
    return {
      success: false,
      message: `Error al registrar la empresa: ${error.message}`,
    };
  }
};


// Función para iniciar sesión
FBQueries.Login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Usuario autenticado:", user.uid);

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      user: user,
    };
  } catch (error) {
    console.error("Error en inicio de sesión: ", error.message);
    return {
      success: false,
      message: "Error al iniciar sesión: " + error.message,
    };
  }
};

