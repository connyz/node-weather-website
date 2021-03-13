const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3d37eb1f957cbb088002f41c8259972b&query=" + latitude + "," + longitude;

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather services", undefined);
        }else if(body.error){
            callback("Unable to find weather. Try another search", undefined)
        }else{
            callback(undefined, `Description: ${body.current.weather_descriptions[0]}, Temp: ${body.current.temperature}, Feelslike: ${body.current.feelslike}`);
        };
    });
};

module.exports = forecast;