import inquirer from "inquirer";

const promptInput = async () => {
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
    console.log(answer.userInput);
    return answer.userInput;
};

//returns a selection of ["Artwork", "Sprites", "Stats"]
const promptOptions = async () => {
    const banana = await promptInput();
    inquirer
        .prompt([
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
        ])
        .then((answers) => {
            console.log(answers["File options"]);
            return answers["File options"];
        });
};
promptOptions();
