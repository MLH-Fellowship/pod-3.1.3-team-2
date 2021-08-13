//Setup Express
const express = require('express') //Set up our main function variable for calling the Express module and require it as a dependency
const app = express() //Object returned by express() 

//Express needs a port and host for its output. We'll define these here and change them later.
const port = 3000;
const host = '0.0.0.0';

const cockroach = "cockroach sql --url 'postgresql://lucas:lucasvinzon1@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert='$HOME'/root.crt&options=--cluster%3Dvalid-monkey-2858'"

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const Sequelize = require("sequelize-cockroachdb");
 
// For secure connection to CockroachDB
const fs = require('fs');

 
// Connect to CockroachDB through Sequelize
var sequelize = new Sequelize({
  dialect: "postgres",
  username: "lucas",
  password: "lucasvinzon1",
  host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
  port: 26257,
  database: "valid-monkey-2858.note",
  dialectOptions: {
    ssl: {
      
      //For secure connection:
      ca: fs.readFileSync('certs/ca.crt')
              .toString()
    },
  }, 
});

const It = sequelize.define("its", {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  username: {
      type: Sequelize.TEXT,
      unique: true,
  },
  list: {
      type: Sequelize.TEXT,
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  }
});

app.get('/', (req, res) => {
 let username = 'lucas';
  //Get our data from CockroachDB
  It.sync({
       force:false,
  })
  .then(function() {
     return It.findAll({ where: {username: username},
	raw: true,
	});
  }).then(function (response) {
      res.json({db_response: response})
  	console.log("success",response)
  }).catch(function(err){
    res.send(err)
    console.log("error",err)
  })
});

app.put('/', function (req, res) {
 
  //Get our values submitted from the form
  let username = req.body.username;
  let list = req.body.list;
console.log(req);
It.sync({
       force:false,
  }).then(function() {
  //Add our POST data to CockroachDB via Sequelize
  return It.upsert(
          {
	  username: username,
          list: list,
          createAt: new Date(),
          updatedAt: new Date()
          }
      )
      //Error handling for database errors
      .catch(function (err) {
      console.error("error: " + err.message);
      });    
      
      //Tell them it was a success
      
})
res.send('Submitted Successfully!<br /> Name:  ' + username + '<br />list:  ' + list);
});

app.listen(port, host, () => {
  console.log(`Server started at ${host} port ${port}`);
});
