import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Agrega la importación correcta
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";  // Asegúrate de tener la configuración correcta de Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const FBQueries = {};

FBQueries.SignupCompany = async (companyData, userSafetyInfo, userData, companyImageFile, userImageFile) => {
  const docID = companyData.ID_company_tax;

  // Verifica que el ID de la empresa esté definido
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
      await uploadBytes(companyImageRef, companyImageFile);  // Subir el archivo de imagen
      companyImageUrl = await getDownloadURL(companyImageRef);  // Obtener la URL de descarga
      companyData.company_image = companyImageUrl;  // Actualizar la URL de la imagen en los datos de la empresa
      console.log("Imagen de la empresa subida correctamente:", companyImageUrl);
    }

    // Subir la imagen del usuario si está disponible
    if (userImageFile) {
      console.log("Subiendo imagen del usuario...");
      const userImageRef = ref(storage, `EMPRESAS/${docID}/USUARIO/${userData.ID_user}/profile_image.jpg`);
      await uploadBytes(userImageRef, userImageFile);  // Subir el archivo de imagen
      userImageUrl = await getDownloadURL(userImageRef);  // Obtener la URL de descarga
      userData.image = userImageUrl;  // Actualizar la URL de la imagen en los datos del usuario
      console.log("Imagen del usuario subida correctamente:", userImageUrl);
    }

    // Registro del usuario en Firebase Authentication
    console.log("Registrando el usuario en Firebase Authentication...");
    const userCredential = await createUserWithEmailAndPassword(auth, userData.work_email, userSafetyInfo.password);
    const user = userCredential.user;
    console.log("Usuario registrado en Firebase Authentication:", user.uid);

    // Limpiar el campo password_validation de los datos de seguridad del usuario
    const { password_validation, password, ...cleanedUserSafetyInfo } = userSafetyInfo;

    // Remover el campo company_image de los datos del usuario si existe
    const { company_image, ...cleanedUserData } = userData;

    // Combinar los datos del usuario con la información de seguridad, y guardar el UID del usuario
    const combinedUserData = {
      ...cleanedUserData,
      ...cleanedUserSafetyInfo,
      uid: user.uid,
    };

    console.log("Guardando datos del usuario en Firestore...");
    // Guardar los datos del usuario en Firestore
    const userCollectionRef = collection(db, "EMPRESAS", docID, "USUARIO");
    await addDoc(userCollectionRef, combinedUserData);
    console.log("Datos del usuario guardados correctamente en Firestore.");

    console.log("Guardando datos de la empresa en Firestore...");
    // Guardar los datos de la empresa
    const empresaCollectionRef = collection(db, "EMPRESAS", docID, "EMPRESA");
    await addDoc(empresaCollectionRef, companyData);
    console.log("Datos de la empresa guardados correctamente en Firestore.");

    return {
      success: true,
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

