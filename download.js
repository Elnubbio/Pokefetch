import fs from "fs/promises";
import path from "path";

const folder = "lugia";
//Function to create a folder - called at the start each time the program is used - the stats etc. of each pokemon are saved in a new folder with the pokemon's name
const createDir = async (folderName) => {
    const dirPath = `${process.cwd()}${path.sep}${folderName}`; //currentpath\folderName
    try {
        await fs.mkdir(dirPath); //throws an error if directory already exists
    } catch (error) {
        console.log("Folder already exists"); //for testing - remove later
    }
    await fs.access(dirPath);
};

export { createDir };
