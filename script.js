// const apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

const apiKey = "55d5ecb0fc4b54a0ee0c2b144cd6ca64";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector("#search-button");
const weatherIcon = document.querySelector("#weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    error.style.display = "block";
    weather.style.display = "none";
  }

  if (response.status === 400) {
    alert("Please enter name of the city!");
  }

  const data = await response.json();
  console.log(data, "data");

  document.querySelector(".city").innerHTML = data.name;
  const temp = (document.querySelector(".temp").innerHTML =
    Math.ceil(data.main.temp) + "&#8451");
  const humidity = (document.querySelector(".humidity").innerHTML =
    data.main.humidity + "%");
  const wind = (document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + "km/h");

  if (data.weather[0].main === "Clear") {
    weatherIcon.className = "fa-solid fa-sun";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.className = "fa-solid fa-cloud-mist";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.className = "fa=solid fa-cloud-drizzle";
  }

  weather.style.display = "block";
  error.style.display = "none";
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});
