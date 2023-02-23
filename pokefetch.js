//Fetching
//Send a fetch request to the API and wait for promises to resolve then output JSON promise

import fs from "fs/promises";
import path from "path";
import { createDir } from "./download.js";
const testUserInput = "charizard";

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

//wait for info then return stats from it
const getStats = async (pokemonName) => {
    const pokemonObject = await pokeFetcher(pokemonName);
    let statsString = "Statistics:\n";
    for (const statistics of pokemonObject.stats) {
        statsString += `${statistics.stat.name}: ${statistics.base_stat} \n`;
    }
    //return statsString; //This is the contents of the stats.txt file this project creates
    await createDir(pokemonName);
    await fs.writeFile(
        `${process.cwd()}${path.sep}${pokemonName}${path.sep}stats.txt`,
        statsString
    );
};

const getImages = async (pokemonName) => {
    const pokemonObject = await pokeFetcher(pokemonName);
};

pokeFetcher(testUserInput);
getStats(testUserInput);
