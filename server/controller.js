// controller.js
// Logic behind the functionalities
const data = require("./data");

const baseUrl = 'https://graph.instagram.com/';
const userToken = 'IGQVJYMWFCTFZA6TlpnSXFwbXlONzFzMzQyc0pyNGxsNlhJZAzE4elFDYUhqREVJSUp0ZA0lKNlhzOWowdUtETmd2T2g3VTJDWjBhcWU3a0docnlxN1cyRTFmbW1yaXV3bnJUS1ZAIY1ZAkVGs1aWZAvYXRidAZDZD';
const queryUrl = `me/media?id,caption,media_url,media_type,permalink&access_token=${userToken}`;


class Controller {
    // getting all todos
    async getTodos() {
        // return all todos
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single todo
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (todo) {
                // return the todo
                resolve(todo);
            } else {
                // return an error
                reject(`Todo with id ${id} not found `);
            }
        });
    }

    // creating a todo
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            // create a todo, with random id and data sent
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo,
            };

            // return the new created todo
            resolve(newTodo);
        });
    }

    // updating a todo
    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            todo["completed"] = true;
            // return the updated todo
            resolve(todo);
        });
    }

    // deleting a todo
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            // else, return a success message
            resolve(`Todo deleted successfully`);
        });
    }
}

module.exports = Controller;