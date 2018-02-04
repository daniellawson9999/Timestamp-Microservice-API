const express = require('express');
const router = express.Router();

//send main page
router.get('/', (req,res) => {
  res.render('index');
});

//respond to a date request
router.get('/:date',(req,res) => {
  let actual = null;
  let unix = null;
  //get request date parameter
  let input = req.params.date;
  //convert to number if the date is a number using a regular expression
  if(/^[0-9]+$/i.test(input)){
    input = parseInt(input);
    //console.log("converted to int");
  }
  //create a date for input
  let date = new Date(input);
  if(!(date == 'Invalid Date')){
    //parse returns the unix time
    unix = Date.parse(date);
    //toDateString returns the date, but includes the week day and does not contain a ,
    //this line sets actual to the string we want minus the comma
    actual = date.toDateString().slice(date.toDateString().indexOf(' ')+1);
    //split into an array
    actual = actual.split(' ');
    //add a comma
    actual[1] += ',';
    //turn back into a string
    actual = actual.join(' ');
  }
  result = {
    unix: unix,
    natural: actual
  };
  //output result
  res.status(200).send(result);
});

module.exports = router;
