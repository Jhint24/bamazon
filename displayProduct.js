var connection = require("./connection");
function displayProducts()  {
    console.log("All Products For Sale: \n");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res)   {
        if (err)    {
            console.log(err);
        }
        else    {

            // console.log(res);
            // // for (var i = 0; i = res.length; i++)    {
            //     console.log(res[i].item_id);
            //     }       
            var itemArray = [];
            for (var i = 0; i < res.length; i++) {
              itemArray.push(res[i].product_name);
              itemArray.push(res[i].item_id);
              itemArray.push(res[i].price);

              console.log(itemArray);
            }     
            connection.end();
        }
    })
}


module.exports = displayProducts();