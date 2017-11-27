const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
router.get('/users', (req, res) => {

  if (req.headers.authorization !== 'Bearer ' + undefined) {
    const connection = getConnection();
    connection.connect();
    connection.query('SELECT id, firstName, lastName, userName, email FROM users order by id asc', function(err, rows, fields) {
      if (!err) {
        console.log(rows);
        res.send(JSON.stringify(rows));
      } else {
        console.log('Error while performing Query');
      }
    });
    connection.end()
  } else {
    res.status(401)
  }

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

//authenticate user
router.post('/authenticate', (req, res) => {
  const connection = getConnection();
  connection.connect();
  let params = req.body
  let credentials = [ req.body.email, req.body.password]

  //find if any user matches login credentials
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', credentials, function(err, result){
    if (result.length) {
      let resultQuery = result[0];

      let string = JSON.stringify(resultQuery)
      let user = JSON.parse(string)

      let token = jwt.sign(user.userName, 'superSecret')

      res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        token: token
      })
      res.status(200).end();
    }
  })
  connection.end();
})

module.exports = router;
