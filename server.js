// server.js
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

//Database setup
// var project = require('./models/project');
var Projects = [{
    "id": 0,
    "message": "5635512063 Anti-theft System",
    "like": 57,
    "share": 14
  },
  {
    "id": 1,
    "message": "5635512017 Phuket RO Water System",
    "like": 51,
    "share": 13
  },
  {
    "id": 2,
    "message": "Facebook like project",
    "like": 73,
    "share": 43
  },

];
var projectIndex = 3;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

// more routes for our API will happen here
// on routes that end in /project

// get all the project (accessed at GET http://localhost:8080/api/project)
router.route('/projects')
  .get(function(req, res) {
    // res.json(project.findAll());
    res.json(Projects);
  });

// create a bear (accessed at POST http://localhost:8080/api/project)
router.route('/projects')
  .post(function(req, res) {
    var project = {};
    project.id = projectIndex++;
    project.message = req.body.message;
    project.like = req.body.like;
    project.share = req.body.share;
    //project.save(bear);
    Projects.push(project);
    res.json({
      message: 'Project created!'
    });
  });

// on routes that end in /project/:project_id
router.route('/projects/:project_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/project/:project_id)
  .get(function(req, res) {
    res.json(Projects[req.params.project_id]);
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/project/:project_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Projects[req.params.project_id].message = req.body.message; // update the project info
    Projects[req.params.project_id].like = req.body.like; // update the project info
    Projects[req.params.project_id].share = req.body.share; // update the project info
    res.json({
      message: 'Project updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/project/:project_id)
  .delete(function(req, res) {
    delete Projects[req.params.project_id]
    res.json({
      message: 'Project deleted!'
    });
  })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//static directory
app.use(express.static('public'))

// use the router and 401 anything falling through
app.use("*", function(req, res) {
  res.status(404).send('404 Not found');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
