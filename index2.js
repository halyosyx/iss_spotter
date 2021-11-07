const nextISSTimesForMyLocation = require('./iss_promised');


const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
  
      const datetime = new Date(0);
      const duration = pass.duration;
      datetime.setUTCSeconds(pass.risetime);
  
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
          
    }
  };
  

nextISSTimesForMyLocation()
    .then((passTimes) => {
        printPassTimes(passTimes);
    })
    .catch((error) => {
        console.log('It did not work:', error.message);
    })