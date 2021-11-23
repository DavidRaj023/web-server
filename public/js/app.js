console.log('Client side Js')

const weatherLocation = document.querySelector('form')
const searchElement = document.querySelector('input')



weatherLocation.addEventListener('submit', (e) =>{
    e.preventDefault()
    const url = 'http://localhost:3000/weather?address=' + searchElement.value
    
    fetch(url).then((res) =>{
    res.json().then((data) => {
        if(data.error){
            document.querySelector('#descriptions').textContent = 'Error: ' + data.info
            document.getElementById('icon').src = ''
            document.querySelector('#temperature').textContent = ''
            document.querySelector('#place').textContent = ''
        } else{
            console.log(data)
            document.querySelector('#descriptions').textContent = 'Weather Descriptions: ' + data.descriptions
            document.getElementById('icon').src = data.icon
            document.querySelector('#temperature').textContent = 'Temperature: ' + data.temperature
            document.querySelector('#place').textContent = 'Place: ' + data.place
        }
        
    })
    })

})