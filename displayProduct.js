var connection = require("./connection");
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
});

// console.log(table.toString());
function displayProducts()  {
    console.log("\n All Products For Sale: \n");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res)   {
        if (err)    {
            console.log(err);
        }
        else    {     
            var itemArray = [];
            for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name,res[i].department_name, res[i].price, res[i].stock_quantity]);
    }     
            console.log(table.toString());

                inquirer.prompt([
                    {
                    type: "input",
                    name: "productId",
                    message: "Please input the Product ID you would like to purchase..."
                    },
                    {
                    type: "input",
                    name: "productQuantity",
                    message: "How many would you like to purchase?"
                    }
                ])
                    .then(function(answer)    {
                        var chosenProduct;
                        for (var i = 0; i < res[i].length; i++)  {
                            if (res[i].item_id === answer.productId)    {
                                chosenProduct = res[i];
                            }
                        
                        var newQuantity = res[i].stock_quantity - chosenProduct.stock_quantity;
                        if (chosenProduct.stock_quantity < res[i].stock_quantity)   {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: newQuantity
                                    },
                                    {
                                        item_id: productId
                                    }
                                ],
                                function(error) {
                                    if (error) throw err;
                                    console.log("Purchase Completed Successfully");
                                }
                            
                            );
                        }
                            else {
                                console.log("There is not enough of this product...")
                            }
                        }
                        //if (user.productQuantity <= res[i].stock_quantity)  {
                    // console.log(answer.productQuantity + " " + answer.productId + " purchased")
                        //}
                });

            connection.end();
        }
    })
}


module.exports = displayProducts;