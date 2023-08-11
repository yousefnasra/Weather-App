let forecast = document.getElementById('forecast');
let findLocation = document.getElementById('findLocation');
let arr = [];

async function search(c) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=67ed74ead33549f3a0a232252230508&q=${c}&days=3`);
    if (data.status == 200 && data.ok) {
        data = await data.json()
        arr = data;
        displayCurrent();
        displayAnother()
    }
}

findLocation.addEventListener('keyup', e => {
    search(e.target.value)
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();


function displayCurrent() {
    let box = '';
    box = `
    <div class="forecast col-lg-4 p-lg-0 rounded-3">
    <div class="forecast-header d-flex justify-content-between align-items-between rounded-top-3">
        <div>${days[d.getDay()]}</div>
        <div>${d.getDate()} ${months[d.getMonth()]}</div>
    </div>
    <div class="forecast-content px-3 py-4 rounded-bottom-3">
        <div class="location">${arr.location.name}</div>
        <div class="degree d-flex justify-content-start align-items-center flex-wrap">
            <div class="temp text-white me-5">${arr.current.temp_c}<sup>o</sup>C
            </div>
            <div class="temp-img d-flex">
                <img src="https:${arr.current.condition.icon}" alt="current condition" width="90px" height="90px" class="align-itemsnter">
            </div>
        </div>
        <div class="main-color my-3">${arr.current.condition.text}</div>
        <span><img src="imgs/icon-umberella.png" alt="umberella" class="me-1">${arr.current.humidity}%</span>
        <span><img src="imgs/icon-wind.png" alt="wind" class="me-1">${arr.current.wind_kph}km/h</span>
        <span><img src="imgs/icon-compass.png" alt="compass" class="pe-1">East</span>
    </div>
</div>
    `
    forecast.innerHTML = box;
}

function displayAnother() {
    let box = '';
    for (let i = 1; i < arr.forecast.forecastday.length; i++) {
        box += `
    <div class="forecast col-lg-4 p-lg-0">
    <div class="forecast-header d-flex justify-content-center align-items-center rounded-top-3">
        <div>${days[new Date(arr.forecast.forecastday[i].date).getDay()]}</div>
    </div>
    <div class="forecast-content px-3 py-4 rounded-bottom-3 d-flex flex-column justify-content-center align-items-center">
        <div class="temp-img d-flex justify-content-center align-items-center">
            <img src="https:${arr.forecast.forecastday[i].day.condition.icon}" alt="current condition" width="45">
        </div>
            <div class="tempo text-white mx-auto my-3">${arr.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C
            </div>
            <small class="mx-auto mb-3">${arr.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C
            </small>
        <div class="main-color mx-auto pb-4 mb-3">${arr.forecast.forecastday[i].day.condition.text}</div>
    </div>
</div>
    `
    }
    forecast.innerHTML += box;
}
search("cairo");

