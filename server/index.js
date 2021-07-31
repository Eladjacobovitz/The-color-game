const express = require('express')
const bodyParser = require('body-parser')
let dbModule = require('./db');
dbModule.connectToDb();
var ObjectId = require('mongodb').ObjectId;

const app = express()
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function(req, res) {
  res.send("Server.")
});


app.post("/reg", async (req, res) => {
  res.sendStatus(await dbModule.addUser(req.body))
  console.log("registration json")
  console.log(req.body)
})


app.post("/record", (req, res) => {
  res.sendStatus(dbModule.addItem(req.body))
  console.log("new record")
  console.log(req.body)
})


app.post("/forgot", (req, res) => {
  res.sendStatus(dbModule.addItem(req.body))
  console.log("new record")
  console.log(req.body)
})


app.post("/updateUser", (req, res) => {
  console.log('update record of userName: ' + req.body.userN)
  const filter = {_id: ObjectId(req.body._id)}
  const updateDoc = {$set: {EasyBestRecord: req.body.EasyBestRecord, MediumBestRecord: req.body.MediumBestRecord, HardBestRecord: req.body.HardBestRecord}};
  res.sendStatus(dbModule.updateItem(filter, updateDoc))
})


app.get("/getAll", (req, res) => {
  dbModule.getAllItems(function(err, values) {
    if (err) res.send("Error.")
    else res.send(values)
  })
})


app.get("/getRecords", (req, res) => {
  dbModule.getRecordsItems(function(err, values) {
    if (err) res.send("Error.")
    else res.send(values)
  })
})


app.listen(process.env.PORT || 5555, () => console.log('server running on port', process.env.PORT || 5555));

