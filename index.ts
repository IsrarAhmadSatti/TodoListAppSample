#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = ["Get"]
let completed:string[] = []

async function main() {
    let answer = await inquirer.prompt([
        {
            type: "list",
            name: "todo",
            choices: ["Add Todo", "Show Todo", "Delete Todo","Move to do","view completed","Exit"],
        }
    ])
    switch (answer.todo) {
        case "Add Todo":
            await addTodo()
            break;
        case "Show Todo":
            await showTodo()
            break;
        case "Delete Todo":
            await deleteTodo()
            break;
        case "Move to do":
            await moveTodo()
            break;
        case "view completed":
            await viewCompleted()
            break;
        case "Exit":
            console.log(chalk.redBright("\tThank you for using Todo App"))
            break;
        default:
            break;
    }
}

async function addTodo() {
    let answer = await inquirer.prompt([
        {
            type: "input",
            name: "add",
            message: "Enter the Task/todo to be added"
        }
    ])
    if (todolist.indexOf(answer.add) != -1) {
        console.log(chalk.redBright("\tAlready in list"))
        await addTodo()
    }
    else if ((answer.add == "") || (answer.add.length > 30)) {
        console.log(chalk.redBright("\tINVALID INPUT!!! Try Again"))
        await addTodo()
    }
    else {
        todolist.push(answer.add) 
          console.log(chalk.greenBright("\tTodo Added"))
          await main()
    }
}
async function showTodo() {
    if (todolist.length === 0){
        console.log(chalk.redBright("\tList is empty: Add something first"));
        await addTodo()
    }
    else
    {
    console.log(todolist)
    await main()
    }
}

async function deleteTodo() {
    if (todolist.length === 0){
        console.log(chalk.redBright("\tList is empty: Add something first"));
        await addTodo() 
    }
    else{
    let answer = await inquirer.prompt([
        {
            type: "input",
            name: "delete",
            message: "Enter the todo to be deleted"
        }
    ])
    if (todolist.indexOf(answer.delete) == -1)
    {
        console.log(chalk.redBright("\tNot found in list try again"))
        deleteTodo();
    }
    else if (answer.delete == "") {
        console.log(chalk.redBright("\tINVALID INPUT!!! Try Again"))
        await deleteTodo()
    }
    else {
    todolist.splice(todolist.indexOf(answer.delete), 1)
    console.log(chalk.greenBright("\tTodo Deleted"))
    await main()
    }
    }
}

async function moveTodo() {
    let answer = await inquirer.prompt([
        {
            type: "input",
            name: "move",
            message: "Enter your todo"
        }
    ])
    if (todolist.indexOf(answer.move) == -1)
    {
        console.log(chalk.redBright("\tNot found in list try again"))
        moveTodo();
    }
    else if (answer.move == "") {
        console.log(chalk.redBright("\tINVALID INPUT!!! Try Again"))
        await moveTodo()
    }
    else{
    completed.push(answer.move)
    todolist.splice(todolist.indexOf(answer.move), 1)
    console.log(chalk.greenBright("\tTodo Moved to completed list"))
    await main()
    }
}
async function viewCompleted() {
    if (completed.length === 0){
        console.log(chalk.redBright("\tList is empty: Add something first"));
        await addTodo()
    }
    else{
    console.log(completed);
    await main()
    }
}

main()