const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm9vdHJzayIsImEiOiJjazVnOWRqeDAwNTFxM2RwYmptcWJmYnBpIn0.VeWzTx2FJA6zIbjDDmfbYQ&limit=1'
    request({url : url ,json : true},(error,response)=>{
        if(error){
            callback('unable to connect to server',undefined)
        } else if (response.body.features.length ===0){
            callback('No such location found try again',undefined)
        } else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
})}
module.exports = geocode