var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "bamazon_db"
});

var table = new Table({
    head: ['product ID', 'product name', 'department name', 'price', 'stock quantity'],
    colWidths: [200, 200, 200, 200, 200]
});

function products() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.table(data);
        purchase();
    })
};

function purchase() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                message: "Select the product you wish you purchase.",
                name: "productChoice",
                type: "list",
                choices: function () {
                    var products = data.map(function (product) {
                        return product.product_name;
                    });
                    return products;
                }
            }
        ]).then(function (productName) {
            inquirer.prompt([
                {
                    message: "How many of " + productName.productChoice + " would you like to purchase?",
                    name: "quantity",
                    validate: function (input) {
                        if (isNaN(input)) {
                            return "Please enter a numeric quantity.";
                        } return true;
                    }
                }
            ]).then(function (quantity) {
                var chosenItem;
                for (var i = 0; i < data.length; i++) {
                    if (productName.productChoice === data[i].product_name) {
                        chosenItem = data[i];
                    }
                }
                if (parseInt(quantity.quantity) > chosenItem.stock_quantity) {
                 console.log("Insufficient stock. Please select a smaller quantity.");
                    purchase();
                } 
                var newQuantity = (chosenItem.stock_quantity - quantity.quantity); 
                updateQuantity (newQuantity, chosenItem);
            }) 
        })  

    })
};

function updateQuantity (amount, chosenItem) {
        connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ? ", [amount, chosenItem.product_name], function(err, res) {
            if (err) throw err;
            var total = (amount * chosenItem.price);
            console.log("you have purchased " + amount + "of " + chosenItem.product_name + "Your total is " + total);
        })
         }

connection.connect(function () {
    console.log(`Connected as id ${connection.threadId}`);
    products();
});



// if the product stock quantity is greater than users quantity then run the connection.query update; otherwise, message "insufficient stock" & kick back to beginning of products
// EXAMPLE CODE HERE
// connection.query("UPDATE products SET ? WHERE ?", [
//     {skill_rating: parseInt(answers.rating)}, 
//     {skill_name: answers.skill}], function(err) {
//         if (err) throw err;
//         //console.log updated skill [skill] to rating [rating]
//         console.log (`Update skill ${answers.skill} to rating ${answers.rating}.`);
//         menu();
//     }