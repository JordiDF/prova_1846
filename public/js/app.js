// Jorge Diest Fábregas (IFCD02010 | UF1846)

// Captura del div que contindrá el text de les dites
const divDites = document.getElementById('quotes');

// URL del nostre scraper
const URL = 'http://localhost:4000/scraper/';

// Demanem la informació de la URL anterior i la tractem
fetch(URL)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        // console.log(data);
        data.forEach(
            dita => {
                // Es construeix la dita i s'afegeix al div corresponent 
                let resultat = '';
                resultat += '<div class="dita">';
                resultat += `<h2>${dita.Autor}</h2>`;
                resultat += `<p>${dita.Text}</p>`
                resultat += '</div>';
                // console.log(resultat);
                divDites.insertAdjacentHTML('beforeend',resultat);
            }
        )
    })
    .catch((error) => {
        console.log(error);
    });