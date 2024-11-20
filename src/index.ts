import express from 'express';
import path from 'path';

// Handlebars
import { engine } from 'express-handlebars';

import path from 'path';

//Importar libreria de MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Importar swagger
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from './../swagger.config.json';

//Cargar variables de entorno
dotenv.config();



//importar rutas
import router from './routes'
const app = express();
const PORT  = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '..', 'public')))

//Importar la Hash de MongoDB
const dbUrl = process.env.DB_URL;
//console.log('Mongo URL:', dbUrl);

app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, '../public')));

//Conexion a Swagger

const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

// Configuración del motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

//Conexion de MongoDB
mongoose.connect(dbUrl as string)
.then( res => {
    console.log('Conexion exitosa con MongoDB!!..');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(err => {
    console.log('Error al conectar:', err);
});