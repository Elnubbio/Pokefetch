import inquirer from "inquirer";

const promptInput = async () => {
    // console.log("Arrived at promptInput");
    const question = [
        {
            type: "input",
            name: "userInput",
            message: "Enter the name of the pokemon you want to fetch",
            // default() {
            //     return "lugia";
            // },
        },
    ];
    const answer = await inquirer.prompt(question);
    // console.log(answer.userInput);
    return await answer.userInput;
};

//returns a selection of ["Artwork", "Sprites", "Stats"]
const promptOptions = async () => {
    // console.log("Arrived at promptOptions");
    const question = [
        {
            type: "checkbox",
            message: "Select what you want to fetch:",
            name: "File options",
            choices: [
                new inquirer.Separator(" = Choices = "),
                {
                    name: "Artwork",
                },
                {
                    name: "Sprites",
                },
                {
                    name: "Stats",
                },
            ],
        },
    ];
    const answer = await inquirer.prompt(question);
    // console.log(answer["File options"]);
    return await answer["File options"];
    // .then((answers) => {
    //     console.log(answers["File options"]);
    //     return answers["File options"];
    // });
};
export { promptOptions, promptInput };
