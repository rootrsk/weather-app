//Modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./geoCode')
const forecast = require('./forecast')

const app = express()
const port = process.env.PORT || 3000
//Paths 
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')
const publicDir = path.join(__dirname,'../public')
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))
app.set('view engine','hbs')
app.set('views' ,viewsPath)


//Page render
app.get('',(req,res)=>{
    res.render('index',{title: 'Express'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title: 'Help'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About Us'})
})
app.get('/weather',(req,res)=>{
    res.render('weather',{title:'Weather'})
})
app.get('/weathers',(req,res)=>{
    const address = req.query.address
    if(!address) return res.send({error:'Please enter an address'})
    geoCode(address,(error,data)=>{
        if(error) return res.send({error:'Please enter a valid address'})
        forecast(data.latitude,data.longitude,data.location,(error,data)=>{
            console.log(data)
            res.send(data)
        })
    })
})

//Starting a server on port 3000      
app.listen(port,()=>{
    console.log('Server is running on port '+port)
})
