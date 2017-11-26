const express = require('express');
const router = express.Router();

// Get database connection
const mysql = require('mysql');
function getConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'observable_httprequest'
  });
  return connection;
}

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


//get items from database
router.get('/items', (req, res) => {
  const connection = getConnection();
  connection.connect();
  connection.query('SELECT * from items order by id asc', function(err, rows, fields) {
    if (!err) {
      console.log(rows);
      res.send(JSON.stringify(rows));
    } else {
      console.log('Error while performing Query');
    }
  });
  connection.end()
})


//post item in database
router.post('/item', (req, res) => {
  const connection = getConnection();
  connection.connect();
  const newItem = { name: req.body.name };
  console.log("name in server: ", req.body)
  connection.query('INSERT INTO items SET ?', newItem, function(err, result) {
    res.send(newItem)
    res.status(200).end();
  });
  connection.end();
})

module.exports = router;
