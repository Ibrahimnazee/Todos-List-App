#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const todos: string[] = [];
let condition: boolean = true;

console.log(chalk.green("\n \t Welcome To Todo List Application\n"));


    while (condition) {
        // Get todo item from user input
        const answerTodos: any = await inquirer.prompt([
            {
                message: "What Would You like To Add In Your Todos",
                type: "input",
                name: "todoItem",
                validate: (input: string) => {
                    if (input.trim() !== "") {
                        return true;
                    } else {
                        return "Todo cannot be empty. Please enter a valid todo.";
                    }
                },
            },
            {
                message: "Would You like To Add More In Your Todos?",
                type: "confirm",
                name: "addMore",
                default: true,
            },
        ]);

        // Add todo item to the list
        todos.push(answerTodos.todoItem);
        console.log("Updated Todos:", todos);

        // Check if user wants to add more todos or perform other actions
        if (!answerTodos.addMore) {
            // Prompt user for the next action
            const editResponse: any = await inquirer.prompt({
                message: "What do you want to do next?",
                type: "list",
                name: "action",
                choices: ["Edit", "Delete", "Read", "Finish"],
            });

            // Handle different actions based on user's choice
            if (editResponse.action === "Edit") {
                // Edit a todo item
                const todoChoices: any = todos.map((todo, index) => ({
                    name: `${index + 1}. ${todo}`,
                    value: index,
                }));
                const selectedTodoIndex: any = await inquirer.prompt({
                    message: "Select the todo you want to edit:",
                    type: "list",
                    name: "index",
                    choices: todoChoices,
                });
                const updatedTodo: any = await inquirer.prompt({
                    message: "Enter the updated todo item:",
                    type: "input",
                    name: "updatedItem",
                });
                todos[selectedTodoIndex.index] = updatedTodo.updatedItem;
                console.log("Updated Todos:", todos);
            } else if (editResponse.action === "Delete") {
                // Delete a todo item
                const todoChoices: any = todos.map((todo, index) => ({
                    name: `${index + 1}. ${todo}`,
                    value: index,
                }));
                const selectedTodoIndex: any = await inquirer.prompt({
                    message: "Select the todo you want to delete:",
                    type: "list",
                    name: "index",
                    choices: todoChoices,
                });
                todos.splice(selectedTodoIndex.index, 1);
                console.log("Updated Todos:", todos);
            } else if (editResponse.action === "Read") {
                // Read all todos
                console.log("Your Todos:");
                todos.forEach((todo, index) => {
                    console.log(`${index + 1}. ${todo}`);
                });
            } else {
                // Finish the application
                condition = false;
            }
        }
    }
    // Thank user for using the application
    console.log(chalk.yellow("Thank you for using the Todo List Application!"));
