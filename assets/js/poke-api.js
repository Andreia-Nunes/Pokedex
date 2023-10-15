
const pokeApi = {};


function convertPokemonDetailedToPokemonModel(pokemonDetailed){
    const pokemonModel = new Pokemon();

    pokemonModel.number = pokemonDetailed.id;
    pokemonModel.name = pokemonDetailed.name;
    pokemonModel.types = pokemonDetailed.types.map((typeObject) => typeObject.type.name);
    pokemonModel.mainType = pokemonModel.types[0];
    pokemonModel.photo = pokemonDetailed.sprites.other.dream_world.front_default;

    pokemonModel.baseExperience = pokemonDetailed.base_experience;
    pokemonModel.height = pokemonDetailed.height;
    pokemonModel.weight = pokemonDetailed.weight;
    pokemonModel.abilities = pokemonDetailed.abilities.map((abilitieObject) => abilitieObject.ability.name);

    return pokemonModel;
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((object) => convertPokemonDetailedToPokemonModel(object));
}


pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((object) => object.results)
        .then((pokemonList) => pokemonList.map((pokemon) => pokeApi.getPokemonDetail(pokemon)))
        .then((promiseList) => Promise.all(promiseList));
}