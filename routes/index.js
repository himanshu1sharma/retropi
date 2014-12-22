
/*
 * GET home page.
 */
var fs = require('fs');

exports.index = function(req, res){
/*
fs.readFile('./views/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
   else {
        //res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        //res.end();  
    }
}); */
  res.render('index.html', { title: 'Super App!' });
};