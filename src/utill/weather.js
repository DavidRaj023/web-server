const request = require('request')

const weather = (url, callback) => {
    request({url: url, json: true}, (error, { body }) =>{
        // const data = body
        // if (data.error){
        //     callback('Error: ' + (data.error).type + ' Code: ' + (data.error).code + ' Info: ' + (data.error).info)
        // } else{
        //     callback('Temperature in: ' + (data.request).query + ' is ' + (data.current).temperature)
        // }
        callback(body)
    })
}

module.exports = weather