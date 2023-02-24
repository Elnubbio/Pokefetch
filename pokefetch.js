//Fetching
//Send a fetch request to the API and wait for promises to resolve then output JSON promise

import fs from "fs/promises";
import path from "path";
import { createDir, downloadImageFromURL } from "./download.js";
const testUserInput = "pikachu";

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

const getStats = async (pokemonName) => {
    const pokemonObject = await pokeFetcher(pokemonName);
    let statsString = "Statistics:\n";
    for (const statistics of pokemonObject.stats) {
        statsString += `${statistics.stat.name}: ${statistics.base_stat} \n`;
    }
    await createDir(pokemonName);
    await fs.writeFile(
        `${process.cwd()}${path.sep}${pokemonName}${path.sep}stats.txt`,
        statsString
    );
};

const getImageSprites = async (pokemonName) => {
    const pokemonObject = await pokeFetcher(pokemonName);
    //sprites - pokemonObject.sprites - 10 keys, loop through all keys, if value is not null, getImage
    for await (let [key, value] of Object.entries(pokemonObject.sprites)) {
        //returns sprites and only sprites that exist
        if (key !== "other" && key !== "versions" && value !== null) {
            key += ".png"; //change this to add the last 4 chars of value
            await downloadImageFromURL(value, key, testUserInput);
            console.log(`Sprite ${key} downloaded from ${value}`);
        }
    }
};

const getOfficialArtwork = async (pokemonName) => {
    const pokemonObject = await pokeFetcher(pokemonName);
    for await (let [key, value] of Object.entries(
        pokemonObject.sprites.other["official-artwork"]
    )) {
        // key += "_artwork.png"; //also change this one
        key = `artwork_${key}.png`;
        await downloadImageFromURL(value, key, testUserInput);
        console.log(`Artwork ${key} downloaded from ${value}`);
    }
};

pokeFetcher(testUserInput);
getStats(testUserInput);
getImageSprites(testUserInput);
getOfficialArtwork(testUserInput);
