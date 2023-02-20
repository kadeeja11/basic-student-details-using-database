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

    var query = "INSERT INTO student_details(username, rollno, phone, gender, dob)VALUES('" + userName + "','" + rollNo +"','" +phone +"','" +gender +"','" + dob +"')"

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

app.get('/getstudents', (req, res) => {
    

  var query = "SELECT * FROM student_details"

  console.log("Query is ",query)

  var responseJson 
  client.query(
    query,
    (err, result) => {
      // console.log(err, result);

      console.log(result.rows)
      responseJson = result.rows
      console.log("Response is",responseJson);
      res.send(responseJson)

    }
  );


})

app.get('/', (req, res) => {
    
  console.log(req)
})


app.delete('/deleteStudent',(req,res) => {
  var data = req.body;
  var query = "DELETE FROM student_details where rollno = '" + data.rollno + "'";
  console.log(query);
  client.query(query, function (err, res) {
    if (err) throw err;
    console.log("deleted");
    // res.send("deleted");
  })
})

/*app.put('/editStudent',(req,res)=> {
  var data = req.body;
  var query1 = "UPDATE student_details SET username = ' " + document.getElementById("userName").value + " ' where username = ' " + data.userName + " ' ";
  var query2 = "UPDATE student_details SET rollno = ' " + document.getElementById("rollNo").value + " ' where rollno = ' " + data.rollNo + " ' ";
  var query3 = "UPDATE student_details SET dob = ' " + document.getElementById("DOB").value + " ' where dob = ' " + data.dob + " ' ";
  var query4 = "UPDATE student_details SET gender = ' " + document.getElementById("Gender").value + " ' where gender = ' " + data.gender + " ' ";
  var query5 = "UPDATE student_details SET phone = ' " + document.getElementById("Phone").value + " ' where phone = ' " + data.phone + " ' ";
  console.log(query1);
  console.log(query2);
  console.log(query3);
  console.log(query4);
  console.log(query5);
  client.query(query1, function (err, res) {
    if (err) throw err;
    console.log("updated");
    // res.send("updated");
  })
  client.query(query2, function (err, res) {
    if (err) throw err;
    console.log("updated");
    // res.send("updated");
  })
  client.query(query3, function (err, res) {
    if (err) throw err;
    console.log("updated");
    // res.send("updated");
  })

})*/


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})