// const container = document.querySelector('.container');
// const search = document.querySelector('.search-box button');
// const weatherBox = document.querySelector('.weather-box');
// const weatherDtails = document.querySelector('.weather-details');
// const error404 = document.querySelector('.not-found');



// search.addEventListener("click", () => {
//   const APIKey = '0f4acb8ae2a40d1b0e85fc7ea116969d';
//   const city = document.querySelector('.search-box input').value;

//   if (city == '') 
//     return;

//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API key}"
//   )
//     .then((reponse) => reponse.json())
//     .then((json) => {

// if    (json.cod == '404'){
//         container.style.height ='404px';
//     error404.classList.add('active');
//     }
// )



//       const image = document.querySelector(".weather-box img");
//       const temperature = document.querySelector(".weather-box .temperature");
//       const description = document.querySelector(".weather-box .description");
//       const humidity = document.querySelector(".weather-box .humidity span");
//       const wind = document.querySelector(".weather-box .wind span");

//       switch (json.weather[0].main) {
//         case "Clear":
//           image.src = "images/clear.png";
//           break;

//         case "Rain":
//           image.src = "images/rain.png";
//           break;

//         case "Snow":
//           image.src = "images/snow.png";
//           break;

//         case "Clouds":
//           image.src = "images/cloud.png";
//           break;

//         case "Mist":
//           image.src = "images/mist.png";
//           break;

//         case "Haze":
//           image.src = "images/mist.png";
//           break;

//         default:
//           image.src = "images/cloud.png";
//       }

// temperature.innerHTML ='${parseInt(json.main.temp)}<span>°C</span>';
// description.innerHTML ='${json.weather[0].description}';
// humidity.innerHTML ='${json.main.humidity}%';
// wind.innerHTML ='${parseInt(json.wind.speed)}Km/h';










//     });
// });


const apiKey = '0f4acb8ae2a40d1b0e85fc7ea116969d'; 
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;
    if (city === '') return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherBox.style.visibility = 'hidden';
                weatherDetails.style.visibility = 'hidden';
                notFound.style.visibility = 'visible';
                return;
            }

            notFound.style.visibility = 'hidden';
            weatherBox.style.visibility = 'visible';
            weatherDetails.style.visibility = 'visible';

            const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            const humidity = document.querySelector('.info-humidity span');
            const windSpeed = document.querySelector('.info-wind span');

            const weather = data.weather[0].main.toLowerCase();
            image.src = `images/${weather}.png`;  
            
            function getWeatherIcon(weather) {
              const iconMap = {
                  '01d': 'clear.png',
                  '01n': 'clear.png',
                  '02d': 'cloud.png',
                  '02n': 'cloud.png',
                  '03d': 'cloud.png',
                  '03n': 'cloud.png',
                  '04d': 'mist.png',
                  '04n': 'mist.png',
                  '09d': 'rain.png',
                  '09n': 'rain.png',
                  '10d': 'rain.png',
                  '10n': 'rain.png',
                  '11d': 'rain.png',
                  '11n': 'rain.png',
                  '13d': 'snow.png',
                  '13n': 'snow.png',
                  '50d': 'mist.png',
                  '50n': 'mist.png'
              };
              return iconMap[weather] || 'cloud.png';
          }
            
            temperature.innerHTML = `${Math.round(data.main.temp)} <span>°C</span>`;
            description.innerHTML = data.weather[0].description;
            humidity.innerHTML = `${data.main.humidity}%`;
            windSpeed.innerHTML = `${Math.round(data.wind.speed)} Km/h`;
        })
        .catch(() => {
            weatherBox.style.visibility = 'hidden';
            weatherDetails.style.visibility = 'hidden';
            notFound.style.visibility = 'visible';
        });
});
