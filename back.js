const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'student',
  password: 'postgres',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/addstudent', (req, res) => {
    
    console.log(req.body)
    var userName = req.body.userName
    var rollNo = req.body.rollNo
    var gender = req.body.gender
    var phone = req.body.phone
    var dob = req.body.dob

    // Add db insert code here

    var query = "INSERT INTO student1(username, rollno, phone, gender, dob)VALUES('" + userName + "','" + rollNo +"','" +phone +"','" +gender +"','" + dob +"')"

    console.log("Query is ",query)

    var respErr

    client.query(
      query,
      (err, res) => {
        console.log(err, res);
        respErr = err
      }
    );                                                                

    var response ={}
    if (respErr == null) {
      response["status"] = "Success"

    } else {
      response["status"] = "Failure"

    }

    res.send(response)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

 