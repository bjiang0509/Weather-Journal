// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder (points server code to the folder with the browser code)
app.use(express.static('website'));


// Setup Server
app.get('/all', function (req, res){
    res.send(projectData);
});

app.post('/addEntry', function (req, res){
    projectData.date = req.body.date;
    projectData.weather = req.body.weather;
    projectData.feeling = req.body.feeling;
    projectData.temp = req.body.temp;
    console.log(projectData);
})

const port = 8000; 

let listening = () => {
    console.log(`server is running a port ${port}`);
}
const server = app.listen(port, listening);