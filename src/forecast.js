const request = require('request')
const forecast = (latitude,longitude,location,callback) =>{
    const url = 'https://api.darksky.net/forecast/97efc916259805f85a7ad8a5d10c6561/'+latitude+','+longitude+'?units=auto'
    request({url : url ,json : true},(error,response)=>{
        if(error){
            callback('Unable to connect to server.',undefined)
        } else if(response.body.error){
            callback('Unable to find the location.',undefined)
        } else {
            callback(undefined,{
                location : 'Location : '+location,
                timezone : 'TimeZone : '+response.body.timezone,
                temperature :'Temperature : '+ response.body.currently.temperature +'degdree Celcius',
                rain : response.body.currently.precipProbability+'% chance of rain',
                summary : 'Overall Summery : '+ response.body.daily.summary
            })
        }
    })
}
module.exports = forecast