import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../firebase/config";

const storage = FIREBASE_STORAGE;

export const cargarImagen = async (uri, path) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, path); 
        await uploadBytes(storageRef, blob);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
}

export const cargarImagenMIMEType = async (uri, path) => {
  try {
      const response = await fetch(uri);

      // Extrae el tipo MIME de las cabeceras de la respuesta
      const contentType = response.headers.get('Content-Type');

      const blob = await response.blob();
      const storageRef = ref(storage, path);

      const metadata = {
          contentType: contentType // Usa el tipo MIME extraído
      };

      await uploadBytes(storageRef, blob, metadata);
  } catch (error) {
      console.error('Error al subir la imagen:', error);
  }
}

export const eliminarImagen = async (path) => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
}

export const obtenerImagen = async (path) => {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
}




