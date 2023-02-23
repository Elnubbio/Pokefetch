//Fetching
// const pokemonName = "ditto";

//Send a fetch request to the API and wait for promises to resolve then output JSON
const pokeFetcher = async (pokemonName) => {
    try {
        const pokemonRequest = fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const response = await pokemonRequest;
        const responseJSON = await response.json();
        return responseJSON;
    } catch {
        //hacky error - improve by finding if a pokemon exists with the API
        console.log("Enter a valid pokemon name in lowercase");
    }
};

pokeFetcher("lugia");
