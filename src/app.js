const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utill/weather')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'David Raj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'David Raj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'David Raj'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address param'
        })
    }
    const place = req.query.address
    const url = 'http://api.weatherstack.com/current?access_key=ad9cc9ccee682e5f4b011a619badab5a&query='+place
    weather(url, (data) => {
        if(data.error){
            return res.send({
                error: (data.error).type,
                code: (data.error).code,
                info: 'Unable to find the location.'
            })
        }
        res.send({
            descriptions: (data.current).weather_descriptions[0],
            icon: (data.current).weather_icons[0],
            temperature: (data.current).temperature,
            place: (data.request).query
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Raj',
        errorMessage: 'Help article not found.'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search param'
        })
    }
    res.send({
        products: ['Soap', 'Paste', 'pen']
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Raj',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})