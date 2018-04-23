var connection = require("./connection");
var inquirer = require('inquirer');
var Table = require('cli-table');
var mysql = require('mysql');
var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
});


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

        }
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
        .then(function(answer)  {
            if (answer.productId >= res.length) {
                console.log("Please input a correct Product ID");
                displayProducts();
            }
            else {
                //validateQuantity();
                //console.log("valid id number")
                validateQuantity(answer);
                // connection.end();  
            }
        })
    })
    }    

function validateQuantity(trust) {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?;";
    connection.query(query, {item_id: trust.productId}, function(err, res) {
        if (err) throw err;
    
        else if (trust.productQuantity > res[0].stock_quantity) {
          console.log("Please input a number at or below the current quantity");
          displayProducts();
    }

        else {
        //console.log("getting there");
            updateTable(trust, res);
    }
      });
}

function updateTable(purchase, current)  {
    var newQuantity = (current[0].stock_quantity - purchase.productQuantity)
    //console.log(newQuantity); 

    var query = "UPDATE products SET ? WHERE ?;";
    connection.query(query, [
        {stock_quantity: newQuantity},
        {item_id: purchase.productId}
      
    ],function(err, res) {
        var totalCost = (current[0].price * purchase.productQuantity);
        //console.log(totalCost);
        console.log("Thank you for your purchase of " + purchase.productQuantity + " " + current[0].product_name + "(s). The Total Cost is $" + totalCost);
      });
    connection.end();  
}



module.exports = displayProducts;


//     .then(function(answer)    {
//         var chosenProduct;
//         for (var i = 0; i < res[i].length; i++)  {
//             if (res[i].item_id === answer.productId)    {
//                 chosenProduct = res[i];
//             }
        
//         var newQuantity = res[i].stock_quantity - chosenProduct.stock_quantity;
//         if (chosenProduct.stock_quantity < res[i].stock_quantity)   {
//             connection.query(
//                 "UPDATE products SET ? WHERE ?",
//                 [
//                     {
//                         stock_quantity: newQuantity
//                     },
//                     {
//                         item_id: productId
//                     }
//                 ],
//                 function(error) {
//                     if (error) throw err;
//                     console.log("Purchase Completed Successfully");
//                 }
            
//             );
//         }
//             else {
//                 console.log("There is not enough of this product...")
//             }
//         }
//         //if (user.productQuantity <= res[i].stock_quantity)  {
//     // console.log(answer.productQuantity + " " + answer.productId + " purchased")
//         //}
// });