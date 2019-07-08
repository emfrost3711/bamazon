var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require("cli-table");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889, 
    database: "bamazon_db"
}); 

// var table = new Table({
//     head: ['product ID', 'product name', 'department name', 'price', 'stock quantity'], 
//     colWidths: [200, 200, 200, 200, 200]
// });

function products() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.table(data);
        purchase();
}) 
};

function purchase () {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err; 
        inquirer.prompt([
            {message: "Select the product you wish you purchase.", 
            name: "productChoice",
            type: "list", 
            choices: function() {
                var products = data.map(function (product){
                    return product.product_name; 
                });
                return products; 
            }
        }
        ]).then(function(productName) {
            inquirer.prompt([
                {message: "How many of " + productName.productChoice + " would you like to purchase?",
                name: "quantity",
                validate: function(input) {
                    if (isNaN(input)) {
                    return "Please enter a numeric quantity.";
                } return true;
            }} 
            ]).then (function(quantity) {
console.log("end of purchase");// if the product stock quantity is greater than users quantity then run the connection.query update; otherwise, message "insufficient stock" & kick back to beginning of products
// EXAMPLE CODE HERE
// connection.query("UPDATE skills SET ? WHERE ?", [
//     {skill_rating: parseInt(answers.rating)}, 
//     {skill_name: answers.skill}], function(err) {
//         if (err) throw err;
//         //console.log updated skill [skill] to rating [rating]
//         console.log (`Update skill ${answers.skill} to rating ${answers.rating}.`);
//         menu();
//     }

})


})
        })
    } )
}

connection.connect(function() {
    console.log(`Connected as id ${connection.threadId}`); 
    products(); 
});
