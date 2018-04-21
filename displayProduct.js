var connection = require("./connection");
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

            
            //console.log(res);
            // // for (var i = 0; i = res.length; i++)    {
            //     console.log(res[i].item_id);
            //     }       
            var itemArray = [];
            for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name,res[i].department_name, res[i].price, res[i].stock_quantity]);   
            //   itemArray.push(res[i].item_id);                
            //   itemArray.push(res[i].product_name);
            //   itemArray.push(res[i].department_name);
            //   itemArray.push(res[i].price);
            //   itemArray.push(res[i].stock_quantity);
            //  console.log(itemArray);



            }     
            console.log(table.toString());
            //console.log(itemArray);
            connection.end();
        }
    })
}


module.exports = displayProducts;