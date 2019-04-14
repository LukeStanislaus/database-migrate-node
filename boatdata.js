var fs = require('fs');
var obj = require('./boatdata.json')
var fetch = require('node-fetch');

obj = obj.map((elem)=>{return {BoatName: elem.boatName, Crew: parseInt(elem.noOfCrew), PY: parseInt(elem.py)}})
console.log(obj);
obj.forEach(element => {
  fetch('https://j96wicnfo0.execute-api.us-east-1.amazonaws.com/dev/graphql', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: 'mutation SetBoatData($BoatName: String!, $Crew: Int!, $PY: Int!){   BoatData(BoatName: $BoatName, Crew: $Crew, PY: $PY) { 		BoatName     Crew     PY   } }',
  variables: {
    "BoatName": element.BoatName,
    "Crew": element.Crew,
    "PY": element.PY
  }})
  }).then((res)=> console.log(res));
});