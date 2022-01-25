/* Global Variables */

// Create a new date instance dynamically with JS (current date)
let d = new Date();
let newDate = (d.getMonth()+1) +'/'+ d.getDate()+'/'+ d.getFullYear(); //getMonth is 0 based

// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '452e0fc64958fa9d71d9f2f661e9d575&units=imperial';

let generateEntry = (e) => {
    e.preventDefault();
    const country = document.getElementById('country-select').value;
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('diary-input').value;
    //get info from weather api
    getData(baseUrl, country, zip, feelings)
    .then((weatherEntry) => {
        //after getting response from fetch get, we post to server
        console.log(weatherEntry);
        let temp = `${weatherEntry.main.temp} F`;
        let weather = `The weather was ${weatherEntry.weather[0].description}`;
        let feeling = `My feelings: ${weatherEntry.feeling}`;
        let entry = {
            date: newDate,
            weather: weather,
            temp: temp,
            feeling: feeling
        };
        console.log(entry.feeling);
        postData('http://localhost:8000/addEntry',entry)
    })
    .then(() => {
        updateUI();
    })
} 


// Event listener to add function to existing HTML DOM element
let button = document.getElementById('generate');
button.addEventListener('click', generateEntry);

/*update UI function */
const updateUI = async () => {
    const response = await fetch('http://localhost:8000/all');
    try{
        const newData = await response.json();
        let holder = document.getElementById('entry-holder');
        let date = document.getElementById('date');
        let temp = document.getElementById('temp');
        let content = document.getElementById('feeling');
        let weather = document.getElementById('weather');
        date.innerHTML = newData.date;
        temp.innerHTML = newData.temp;  
        content.innerHTML = newData.feeling;
        weather.innerHTML = newData.weather;
    }catch(err){
        console.log('error with updateUI', err);
    }
};

/* Function to POST data */
const postData = async (postUrl, data) =>{
    const response = await fetch(postUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try{
        const postRes = await response.json();
        return postRes;
    }catch(error){
        console.log('error occurred in post: ', error);
    }
} 

/* Function to GET Web API Data*/
const getData = async (baseUrl = '', country, zip, feelings) => {
    /*api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key} */
    const url = `${baseUrl}${zip},${country}&appid=${apiKey}`;
    const response =  await fetch(url)
    try{
        const weatherData = await response.json();
        weatherData.feeling = feelings;
        //return weatherData;
        return weatherData;
    }catch(error){
        console.log('error occurred with get: ', error);
    }
}