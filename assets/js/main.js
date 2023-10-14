
const pokemonOl = document.getElementById("pokemonList");
const loadButton = document.getElementById("loadButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;


function convertPokemonToLi(pokemonModel){
    return `
    <li class="pokemon ${pokemonModel.mainType}">
        <span class="number">#${pokemonModel.number}</span>
        <span class="name">${pokemonModel.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemonModel.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}     
            </ol>

            <img src="${pokemonModel.photo}" alt="${pokemonModel.name}">
        </div>
    </li>
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


