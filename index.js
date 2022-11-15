// Jorge Diest Fábregas (IFCD02010 | UF1846)

// Importació de packages de NodeJS

const express = require('express');

const axios = require('axios');

const cheerio = require('cheerio');

const {join} = require('path');

const cors = require('cors');

// Creació del servidor

// Port per on funcionará 
const PORT = 4000;
// Creació de l'instáncia del servidor
const app = express();
// URL d'on s'obtindrán les frases
const URL = 'https://quotes.toscrape.com/';
// Li diem a la nostra app que usi el package cors per evitar problemes amb l'importació de dades des del nostre propi servidor
app.use(cors());
// Especificació del directori del servidor
app.use(express.static(join(__dirname,'public')));

// Crida de l'scrapper
app.get('/scraper', (req,res) => {
    // Ús del package axios per gestionar les peticions XMLHttpRequest
    axios(URL)
    .then((response) => {
        const html = response.data;
        // Ús del package cheerio per gestionar el DOM del document obtingut
        const $ = cheerio.load(html);
        // Array que contindrá les dites que recollim
        const dites = [];
        $('div.quote',html).each(
            function(){
                const Autor = $(this).find('.author').text();
                // console.log(ditaAutor);
                const Text = $(this).find('.text').text();
                // console.log(ditaText);

                // Afegim les dites com a objectes que tindrán les propietats Autor i Text
                dites.push(
                    {
                        Autor,
                        Text
                    }
                );
            }
        );
        // console.log(dites);
        // Enviament de l'array dites
        res.json(dites);
    }).catch((err) => {
        console.log(err);
    });
})

// Activació del servidor
app.listen(PORT, () => console.log(`Servidor actiu i escoltant en el port ${PORT}`));