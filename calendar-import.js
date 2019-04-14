var fetch = require('node-fetch');
const uuidv4 = require('uuid/v4');
fetch("https://www.googleapis.com/calendar/v3/calendars/wfscweb%40gmail.com/events?alwaysIncludeEmail=true&singleEvents=true&timeMin=2019-01-01T19%3A47%3A17.486Z&key=AIzaSyAtK24q1ZBpaqf8FaUqKg1XWym_r188hGI",{
    method:"get",
    headers: {'Content-Type': 'application/json'}
}).then((res)=> {res.json().then((result)=>{
    result = result.items
    result =result.map((element)=> {
        return {
            "raceId": uuidv4(),
            "raceName": element.summary,
            "eventTimeStamp": (new Date(element.start.dateTime)).getTime(),
            "calendarData": element
        }
    })
console.log(result[0]);
result.forEach(element => {
    fetch('https://5zyrvdhjrg.execute-api.us-east-1.amazonaws.com/dev/graphql', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `
      mutation createRaces($input: CreateRacesInput!){
        createRaces(input:$input){
      result
        }
      }`,
    variables: {
  "input":element
    }})
    }).then((res)=>res.json().then((output)=>{console.log(output);}) );
  });

})})