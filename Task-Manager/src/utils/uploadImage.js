import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Anexar archivo de imagen a los datos del formulario
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                //el encabezado para la carga de archivos
                'Content-Type': 'multipart/form-data', 
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al cargar la imagen:", error);
        throw error;
    }
}

export default uploadImage