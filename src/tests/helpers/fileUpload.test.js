import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'alexrcloud', 
    api_key: '413416311754787', 
    api_secret: 'Nj_V8xb2rrDEcJkYz-lqe4iJT3g',
    secure: true
  });

describe('Pruebas en fileUpload', () => {
   

    test('debe de cargar un archivo y retornar el URL', async() => {
        
        const resp = await fetch('https://googlechrome.github.io/samples/picture-element/images/kitten-small.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const returnedUrl = await fileUpload( file );

        expect( typeof returnedUrl ).toBe('string');

        // Borrar imagen por IDw
        const segments = returnedUrl.split('/'); // corta un arreglo por el parametro recibido
        // console.log(segments);
        const imageId = segments[ segments.length - 1 ].replace('.png',''); // (currentValue,newValue)
        // console.log(imageId);

        await cloudinary.v2.api.delete_resources( imageId, {}, ( error, result ) => {
            // console.log( error, result );
        });
            
    });

    test('debe de retornar un error', async() => {
        
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    });

    //TODO Probar Catch del Try/Catch
    // test('debe de caer en el "catch"', async() => {
        
    //     // const file = 'No soy una imagen';
    //     const error = () => {
    //         throw new TypeError('Wuenas');
    //     }
    //     // const url = await fileUpload('', error);

    //     // console.log(url);

    //     expect(() => { fileUpload(); })
    //         .toThrowError('Wuenas');

    // });
});
