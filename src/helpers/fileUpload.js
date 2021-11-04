
export const fileUpload = async( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/alexrcloud/upload';

    const formData = new FormData(); // sirve para agregar valores para hacer peticiones
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json(); // Error de Cloudinary, si lo hay
        }
        
    } catch (error) {
        throw error; // Error de URL, etc...
    }

    // return url de la imagen
}
