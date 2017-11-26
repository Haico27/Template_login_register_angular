const express = require('express');
const router = express.Router();

// Get database connection
const mysql = require('mysql');
function getConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'register_login'
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
router.post('/user', (req, res) => {
  const connection = getConnection();
  connection.connect();
  const newUser = { firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, email: req.body.email, password: req.body.password };
  console.log("name in server: ", req.body.firstName)
  connection.query('INSERT INTO users SET ?', newUser, function(err, result) {
    res.send(newUser)
    res.status(200).end();
  });
  connection.end();
})

module.exports = router;
