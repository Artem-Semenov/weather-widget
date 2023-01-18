class City {
  constructor(name) {
    this.name = name;
  }

  fetchWeather = async () => {
     await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&appid=0d11d7637efffedbd53ee0ee1ee90aa4`
    )
    .then(data => data.json())
    .then(json => this.weather = json);

    return this.weather
  };

  DOM = async () => {
    this.weather = await this.fetchWeather();
    // console.log(this.weather);
     if(this.weather.cod === '404') {
      // alert('invalid city name')
      return 404
    } 
    // console.log(this.weather.cod);
    this.clouds = this.weather.clouds.all;
    this.temp = this.weather.main.temp - 273.15;
    this.desc = this.weather.weather[0].description;
    this.windSpeed = this.weather.wind.speed;
    this.iconLink = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
    this.feelsLike = this.weather.main.feels_like - 273.15;
    this.humidity = this.weather.main.humidity;
    this.element = document.createElement("div");
    this.element.classList.add("city-wrapper");
    this.element.innerHTML = `
      <h2>${this.name}</h2>
          <div class="icon-wrap">
            <img src="${this.iconLink}" alt="">
          </div>
          <div class="temperature">${~~this.temp}°C</div>
          <div class="description">${this.desc}</div>
          <div class="block-footer">
            <div class="wind">
              <p>Wind</p>
              <div class="wind-numb"> ${this.windSpeed} km/h</div>
            </div>
            <div class="clouds">
              <p>Clouds</p>
              <div class="clouds-num">${this.clouds}%</div>
            </div>
            <div class="humidity">
              <p>Humidity</p>
              <div class="humidity-numb">${this.humidity}%</div>
            </div>
            <div class="feels-like">
              <p>Feels like</p>
              <div class="feels-like-numb">${~~this.feelsLike}°C</div>
            </div>
          </div>
      `;
    return this;
  
  };

  renderCity = async (container) => {
   await this.DOM();
   if (this.weather.cod === '404') {
    alert('invalid city name')
    return false;
   } else {
    container.append(this.element);
    return this;
   }
    
  }
}

export default City