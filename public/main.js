const weather = {
  apiKey: "304ae19fd1e88bd0e9e0b38a20504e25",
  unsplashApiKey: "l9qpmQJDuIv_UESUbIWtrXXfcCT-1__in-qYDoufqFQ",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.display(data));
  },
  fetchPhoto: function (query) {
    fetch(
      "https://api.unsplash.com/search/photos?query=" +
      query +
      "&client_id=" +
      this.unsplashApiKey +
      "&orientation=landscape&per_page=1"
    )
      .then((response) => response.json())
      .then((data) => this.displayPhoto(data));
  },
  fetchRandomPhoto: function () {
    fetch(
      "https://api.unsplash.com/photos/random?client_id=" +
      this.unsplashApiKey +
      "&orientation=landscape"
    )
      .then((response) => response.json())
      .then((data) => this.displayRandomPhoto(data));
  },
  display: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + Math.round(speed) + " km/h";
    document.querySelector(".weather").classList.remove("loadup");

    this.fetchPhoto(name);
  },
  displayPhoto: function (data) {
    if (data.results && data.results.length > 0) {
      const photoUrl = data.results[0].urls.full;
      this.changeBackgroundImage(photoUrl);
    }
  },
  displayRandomPhoto: function (data) {
    const photoUrl = data.urls.full;
    this.changeBackgroundImage(photoUrl);
  },
  changeBackgroundImage: function (url) {
    const body = document.body;
    const img = new Image();
    img.src = url;
    img.onload = function () {
      body.style.backgroundImage = `url('${url}')`;
      body.classList.add('loaded');
      setTimeout(() => {
        body.classList.remove('loaded');
      }, 1000);
    };
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

weather.fetchRandomPhoto();
