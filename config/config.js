const mysql = require('mysql');

var connection;

connection = mysql.createConnection({

    host: '138.128.182.130',
  
    user: 'wan723_admin_plantas',
  
    password: 'Plantas123.,',
  
    database: 'wan723_plantas',
  
    port: 3306
  
  });

connection.connect(function(err) {
    if (err) console.log(err);
});
    
module.exports = connection;  