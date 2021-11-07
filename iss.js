const request = require("request");

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
  
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });

};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=b6a32250-3f89-11ec-82b8-377a18a96a36`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const { latitude,longitude } = JSON.parse(body);
    callback(null, { latitude,longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    
    const data = JSON.parse(body).response;
    callback(null, data);
  });
     
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log('Did not work');
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log('Did not work');
        return;
      }

      fetchISSFlyOverTimes(coords, (error, times) =>{
        if (error) {
          console.log('Did not work');
          return;
        }
        callback(null, times);
      });
    });
  });
};

module.exports = nextISSTimesForMyLocation;
