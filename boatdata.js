var obj = require('./boatdata.json')
var fetch = require('node-fetch');

obj = obj.map((elem)=>{return {boatName: elem.boatName, crew: parseInt(elem.noOfCrew), pY: parseInt(elem.py)}})
console.log(obj);
obj.forEach(element => {
  fetch('https://ap7yn9m9s3.execute-api.us-east-1.amazonaws.com/dev/graphql', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: `mutation UpdateBoatData($input: UpdateBoatDataInput!){
      updateBoatData(input: $input) {
    boatData{
      boatName
      crew
      pY
    }
      }
    }
    `,
  variables: {
"input":element
  }})
  }).then((res)=> console.log(res));
});