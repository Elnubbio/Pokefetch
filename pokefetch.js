//Fetching
//Send a fetch request to the API and wait for promises to resolve then output JSON promise

import fs from "fs/promises";
import path from "path";
import { createDir, downloadImageFromURL } from "./download.js";
import { promptOptions, promptInput } from "./inquire.js";

// const testUserInput = "farfetchd";

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
        return;
    }
};

const getStats = async (pokemonObject, pokemonName) => {
    let statsString = "Statistics:\n";
    for (const statistics of pokemonObject.stats) {
        statsString += `${statistics.stat.name}: ${statistics.base_stat} \n`;
    }
    await fs.writeFile(
        `${process.cwd()}${path.sep}${pokemonName}${path.sep}stats.txt`,
        statsString
    );
    console.log(`Stats downloaded for ${pokemonName}`);
};

const getImageSprites = async (pokemonObject, pokemonName) => {
    //sprites - pokemonObject.sprites - 10 keys, loop through all keys, if value is not null, getImage
    for await (let [key, value] of Object.entries(pokemonObject.sprites)) {
        //returns sprites and only sprites that exist
        if (key !== "other" && key !== "versions" && value !== null) {
            key += ".png"; //change this to add the last 4 chars of value, could be different image format
            await downloadImageFromURL(value, key, pokemonName);
            console.log(`Sprite ${key} downloaded from ${value}`);
        }
    }
};

const getOfficialArtwork = async (pokemonObject, pokemonName) => {
    for await (let [key, value] of Object.entries(
        pokemonObject.sprites.other["official-artwork"]
    )) {
        // key += "_artwork.png"; //also change this one
        key = `artwork_${key}.png`;
        await downloadImageFromURL(value, key, pokemonName);
        console.log(`Artwork ${key} downloaded from ${value}`);
    }
};

// pokeFetcher(testUserInput);
// getStats(testUserInput);
// getImageSprites(testUserInput);
// getOfficialArtwork(testUserInput);

const useOptions = async (pokemonObject, userOptions, pokemonName) => {
    // console.log("Arrived at useOptions");
    if (userOptions.includes("Artwork")) {
        getOfficialArtwork(pokemonObject, pokemonName);
        // console.log("Getting Artwork");
    }
    if (userOptions.includes("Sprites")) {
        getImageSprites(pokemonObject, pokemonName);
        // console.log("Getting Sprites");
    }
    if (userOptions.includes("Stats")) {
        getStats(pokemonObject, pokemonName);
        // console.log("Getting Stats");
    }
};

const pokeFetch = async () => {
    // const userOptions = ["Artwork", "Sprites"];
    const userInput = await promptInput();
    const pokemonObject = await pokeFetcher(userInput);
    try {
        pokemonObject.sprites;
    } catch {
        return; //if there are no sprites, the pokemon doesn't exist so stop
    }
    await createDir(userInput);

    // console.log("received pokemonObject");
    const userOptions = await promptOptions();
    // console.log(userInput, userOptions);
    await useOptions(pokemonObject, userOptions, userInput);
};

pokeFetch();
