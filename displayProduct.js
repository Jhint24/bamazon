var connection = require("./connection");
function displayProducts()  {
    console.log("All Products For Sale: \n");
    connection.query("SELECT * FROM products", function(err, res)   {
        if (err)    {
            console.log(err);
        }
        else    {

            console.log(res);
            // for (var i = 0; i = res.length; i++)    {
            //     console.log(res[i]);
            //     }            
            connection.end();
        }
    } )
}


module.exports = displayProducts();