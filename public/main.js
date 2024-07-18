let test = document.querySelector('#test');

fetch("http://localhost:3000/api/recettes").then(response => {
    if (!response.ok) {
        throw new Error('Erreur HTTP : ' + response.status);
    }

    return response.json();
}).then(data => {
    console.log(data); // Vérifiez ce qui est affiché ici

    // Assurez-vous que data.recettes existe et est un tableau
    if (data.recettes && Array.isArray(data.recettes.recettes)) {
        data.recettes.recettes.forEach(recette => {
            test.innerHTML += `<p>${recette.titre}</p>`;
        });
    } else {
        console.error('data.recettes n\'est pas un tableau', data.recettes);
    }
}).catch(error => {
    console.error(error);
});

