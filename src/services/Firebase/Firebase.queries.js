import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc, collection, addDoc, getDoc,getDocs } from "firebase/firestore"; // Añadir getDoc para obtener un documento
import { db, auth } from "./Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Wallet from "@/lib/wallet/Wallet.lib";

export const FBQueries = {};
// FBQueries.GetUserRole = async (uid) => {

FBQueries.cleanDocID = (docID) => {
  return docID
    .normalize('NFD')  // Normalizar caracteres
    .replace(/[\u0300-\u036f]/g, '')  // Eliminar diacríticos
    .trim()  // Quitar espacios al inicio y final
    .replace(/\s+/g, '_');  // Reemplazar espacios con guiones bajos
},
FBQueries.cleanDocID1 = (docID) => {
  return docID
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '_');
}

const printAsciiCodes = (docID) => {
  for (let i = 0; i < docID.length; i++) {
    console.log(`Char: ${docID[i]}, ASCII: ${docID.charCodeAt(i)}`);
  }
};

FBQueries.SignupCompany = async (companyData, userSafetyInfo, userData, companyImageFile, userImageFile) => {

  // Si no se especifica un ID de documento, generar uno automáticamente
  let docID = FBQueries.cleanDocID(companyData.ID_company_tax) || "Empresa_Test_123";
  
  console.log("ID de la empresa después de limpiar:", docID);
  printAsciiCodes(docID);
  console.log("Valor original de ID_company_tax:", companyData.ID_company_tax);

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
      console.log("Subiendo imagen de la empresa...");
      const companyImageRef = ref(storage, `EMPRESAS/${docID}/EMPRESA/${companyData.company_name}/company_image.jpg`);
      await uploadBytes(companyImageRef, companyImageFile);
      companyImageUrl = await getDownloadURL(companyImageRef);
      companyData.company_image = companyImageUrl;
      console.log("Imagen de la empresa subida correctamente:", companyImageUrl);
    }

    // Subir la imagen del usuario si está disponible
    if (userImageFile) {
      console.log("Subiendo imagen del usuario...");
      const userImageRef = ref(storage, `EMPRESAS/${docID}/USUARIO/${userData.ID_user}/profile_image.jpg`);
      await uploadBytes(userImageRef, userImageFile);
      userImageUrl = await getDownloadURL(userImageRef);
      userData.image = userImageUrl;
      console.log("Imagen del usuario subida correctamente:", userImageUrl);
    }

    // Registro del usuario en Firebase Authentication
    console.log("Registrando el usuario en Firebase Authentication...");
    const userCredential = await createUserWithEmailAndPassword(auth, userData.work_email, userSafetyInfo.password);
    const user = userCredential.user;
    console.log("Usuario registrado en Firebase Authentication:", user.uid);

    // Limpiar campos sensibles
    const { password_validation, password, ...cleanedUserSafetyInfo } = userSafetyInfo;
    const { company_image, ...cleanedUserData } = userData;

    // Combinar los datos del usuario con la información de seguridad
    const combinedUserData = {
      ...cleanedUserData,
      ...cleanedUserSafetyInfo,
      uid: user.uid,
    };

    // Guardar los datos del usuario en Firestore usando el UID como ID del documento
    console.log("Guardando datos del usuario en Firestore...");
    const userDocRef = doc(db, "EMPRESAS", docID, "USUARIO", user.uid);
    await setDoc(userDocRef, combinedUserData);
    console.log("Datos del usuario guardados correctamente en Firestore.");

    // Crear la wallet si no existe
    if (!companyData.wallet) {
      console.log("Creando wallet para la empresa...");
      const wallet = new Wallet();  // Crear una nueva wallet
      companyData.wallet = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        balance: wallet.balance,
      };
      console.log("Wallet creada correctamente:", companyData.wallet);
    }

    // Guardar los datos de la empresa en Firestore
    console.log("Guardando datos de la empresa en Firestore...");
    const empresaCollectionRef = doc(db, "EMPRESAS", docID);  // Almacenar la empresa en la colección
    await setDoc(empresaCollectionRef, companyData);
    console.log("Datos de la empresa guardados correctamente en Firestore.");

    return {
      success: true,
      uid: user.uid,
      userImageUrl: userImageUrl,
      message: "Empresa y usuario registrados correctamente en Firebase Authentication y Firestore.",
    };
  } catch (error) {
    console.error("Error al registrar la empresa y el usuario:", error);
    return {
      success: false,
      message: `Error al registrar la empresa y usuario: ${error.message}`,
    };
  }
};


// Función para obtener el rol del usuario en Firestore
FBQueries.GetUserRole = async (uid) => {
  try {
    console.log("Obteniendo rol del usuario con UID:", uid);

    const companiesSnapshot = await getDocs(collection(db, "EMPRESAS"));
    
    for (const company of companiesSnapshot.docs) {
      const companyTaxID = company.id;
      const userDocRef = doc(db, "EMPRESAS", companyTaxID, "USUARIO", uid);  // Usamos el UID como ID del documento
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("ADMIN del usuario encontrado:", userData.ADMIN);
        return {
          success: true,
          role: userData.ADMIN, 
          companyTaxID,
        };
      }
    }
    
    console.error("No se encontró el documento del usuario en ninguna empresa.");
    return {
      success: false,
      message: "No se encontró el rol del usuario.",
    };
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error.message);
    return {
      success: false,
      message: "Error al obtener el rol del usuario: " + error.message,
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

FBQueries.ListCompaniesWithErrorHandling = async () => {
  try {
    const companiesCollectionRef = collection(db, "EMPRESAS");
    const companiesSnapshot = await getDocs(companiesCollectionRef);

    if (companiesSnapshot.empty) {
      console.log("No se encontraron empresas.");
      return;
    }

    // Recorrer cada documento en la colección y manejar potenciales errores en la obtención
    companiesSnapshot.forEach((doc) => {
      try {
        console.log(`Empresa ID: ${doc.id}`, doc.data());
      } catch (error) {
        console.error(`Error al obtener datos de la empresa ${doc.id}:`, error.message);
      }
    });
  } catch (error) {
    console.error("Error al obtener las empresas:", error.message);
  }
};

FBQueries.GetSpecificCompany = async (companyID,uid) => {
  try {
    // Obtener la referencia al documento de la empresa
    const companyRef = doc(db, "EMPRESAS", companyID);
    const companyDoc = await getDoc(companyRef);


    if (!companyDoc.exists()) {
      console.log(`No se encontró una empresa con el ID ${companyID}`);
      return null;
    }

    // Recuperar los datos de la empresa
    const companyData = companyDoc.data();
    console.log("compañia:"+ companyData);

    // Obtener la colección del usuario
    const usersCollectionRef = doc(db, "EMPRESAS", companyID, "USUARIO", uid);
    const userDoc = await getDoc(usersCollectionRef);

    if (!userDoc.exists()) {
      console.log(`No se encontró un usuario con el UID ${uid}`);
      return null;
    }
    const UserData = userDoc.data();
    console.log("Usuario:"+ UserData);

    // Datos que necesitas en localStorage para la empresa
    const dataCompany = {
      ID_company_tax: companyData.ID_company_tax || '',
      company_name: companyData.company_name || '',
      legal_company_name: companyData.legal_company_name || '',
      company_headquarters: companyData.company_headquarters || {},
      website: companyData.website || '',
      number_employees: companyData.number_employees || '',
      company_description: companyData.company_description || '',
      wallet: companyData.wallet || ''
    };

    const dataAdmin = {
      ID_company_tax: companyData.ID_company_tax || '', //
      ID_FB: UserData ? UserData.ID_FB || '' : '', // 
      ID_user: UserData ? UserData.ID_user || '' : '',//
      name: UserData ? UserData.name || '' : '', //
      surname: UserData ? UserData.surname || '' : '',
      work_email: UserData ? UserData.work_email || '' : '',
      role: UserData ? UserData.role || '' : '', //
      ADMIN: UserData ? UserData.ADMIN || false : false, //
      image: UserData ? UserData.image || '' : '', //
      phone_number: UserData ? UserData.phone_number || '' : '',//
      password: UserData ? UserData.password || '' : '', //
      ssn: UserData ? UserData.ssn || '' : '',
      work_location: UserData ? UserData.work_location || {} : {}
    };

    // Guardar en localStorage
    localStorage.setItem('dataCompany', JSON.stringify(dataCompany));
    localStorage.setItem('dataAdmin', JSON.stringify(dataAdmin));
    localStorage.setItem("userUID", uid); 

    return { ...companyData };
  } catch (error) {
    console.error("Error al obtener la empresa:", error.message);
    return null;
  }
};
