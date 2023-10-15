
const pokemonOl = document.getElementById("pokemonList");
const loadButton = document.getElementById("loadButton");
const maxRecords = 151;
const limit = 12;
let offset = 0;


function convertPokemonToLi(pokemonModel){
    return `
    <li class="pokemon ${pokemonModel.mainType}">
        <span class="number">#${pokemonModel.number}</span>
        <span class="name">
            ${pokemonModel.name}
            <button type="button" class="more-button" onclick="showModal(${pokemonModel.number})">+</button>
        </span>

        <div class="detail">
            <ol class="types">
                ${pokemonModel.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}     
            </ol>

            <img src="${pokemonModel.photo}" alt="${pokemonModel.name}">
        </div>
        
        ${getModalInformations(pokemonModel)}
    </li>
    `
}

function getModalInformations(pokemonModel){
    return `
    <div class="modal ${pokemonModel.mainType}" id="modal-${pokemonModel.number}">

        <header class="modal-header">

            <button type="button" class="close-button" onclick="closeModal(${pokemonModel.number})">X</button>

            <div class="header-info">
                <span>${pokemonModel.name}</span>
            </div>

            <div class="header-image">
                <img src="${pokemonModel.photo}" alt="${pokemonModel.name}">
            </div>
        </header>

        <section class="modal-section">
            <table class="table-info">
                <tr>
                    <th>Base Experience</th>
                    <td>${pokemonModel.baseExperience}</td>
                </tr>
                <tr>
                    <th>Types</th>
                    <td>${pokemonModel.types.join(', ')}</td>
                </tr>
                <tr>
                    <th>Abilities</th>
                    <td>${pokemonModel.abilities.join(', ')}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td>${pokemonModel.height}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>${pokemonModel.weight}</td>
                </tr>

            </table>
        </section>
    </div>
    `
}

function loadPokemonItens(offset, limit){

    pokeApi.getPokemons(offset, limit)
    .then((pokemonModelList) => { 
        const newHtml = pokemonModelList.map((pokemonModel) => convertPokemonToLi(pokemonModel)).join('');
        pokemonOl.innerHTML += newHtml;
    })
    .catch((error) => console.error(error));
}

function showModal(pokemonNumber){
    const modal = document.getElementById(`modal-${pokemonNumber}`);
    modal.style.display = "block";
}

function closeModal(pokemonNumber){
    const modal = document.getElementById(`modal-${pokemonNumber}`);
    modal.style.display = "none";
}

loadPokemonItens(offset, limit);

loadButton.addEventListener("click", () => {
    offset += limit;

    if(offset + limit < maxRecords){
        loadPokemonItens(offset, limit);
    } else{
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadButton.parentElement.removeChild(loadButton);
    }   
    
})


