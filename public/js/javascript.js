
console.log('JavaScript is working ')
const search = document.querySelector('form')
const searchs = document.querySelector('input')
const location_error = document.querySelector('#empty-error')
const location_detail = document.querySelector('#location-details')
location_error.textContent = 'Please enter a location'

search.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(searchs.value)
    location_detail.textContent ='Loading...'
    fetch('http://localhost:3000/weathers?address='+searchs.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){

                location_error.textContent =data.error 
               location_detail.textContent ='' 
            } 
            
            else {
                location_error.textContent ='' 
                  location_detail.textContent =''
                for(let details in data){
                    var btn = document.createElement("p")
                    location_detail.appendChild(btn)
                    btn.textContent=data[details]
                }
                console.log(Object.keys(data))  
            }
        })
    })
})

