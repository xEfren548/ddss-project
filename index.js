const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.json())

// Configuración del motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const port = process.env.PORT || 4000;

const db_url = process.env.DB_URL;

mongoose.connect(db_url).then(async () => {
    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    })
    


}).catch((err) => {
    console.log('failed to connect' + err.message);
});