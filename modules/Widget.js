"use strict";

import City from "https://artem-semenov.github.io/weather-widget/modules/City.js";
// import City from "/modules/City.js";

class Widget {
  constructor(id) {
    this.wrapperElement = document.getElementById(id);
  }
  citiesList = [];

  Init = async (...args) => {
    await this.createCitiesList(...args);

    // setTimeout(() => {
    console.log(this.citiesList);
    this.Render();
    //}, 300);
  };

  createCitiesList = async (...args) => {
    for await (const el of args) {
      let item = new City(el.trim());
      await item.DOM();
      this.citiesList.push(item);
    }
  };

  Render = () => {
    this.citiesList.forEach((el) => {
      this.wrapperElement.append(el.element);
    });
    return "rendering finished";
  };

  getWeatherOnInput = (inputId) => {
    this.input = document.getElementById(`${inputId}`).value;

    if (!this.input) {
      alert("Enter city name!");
      return;
    }

    if (this.citiesList.some((el) => el.name === this.input)) {
      alert("City is already on the stage");
      return;
    } else {
      let city = new City(this.input);

      city
        .renderCity(this.wrapperElement)
        .then((res) => this.citiesList.push(res))
        .catch((error) => console.log(error));
    }
  };

  addEventListener = (btnId, inputId, clearBtnId) => {
    this.clearBtn = document.getElementById(`${clearBtnId}`);
    this.submitBtn = document.getElementById(`${btnId}`);
    this.submitBtn.addEventListener("click", (e) => {
      window.navigator.vibrate(50);
      e.preventDefault();
      this.getWeatherOnInput(inputId);
    });
    this.clearBtn.addEventListener("click", (e) => {
      this.citiesList = [];
      this.wrapperElement.innerHTML = "";
    });
  };
}

let weatherWidget = new Widget("widget-wrapper");

weatherWidget.Init("Kyiv", "Kharkiv", "Uzhgorod");

let secondWeatherWidget = new Widget("sub-widget-weather");

secondWeatherWidget.addEventListener(
  "submit-city",
  "input-city",
  "clear-button"
);

// secondWeatherWidget.Init("Malta");

/* 
setInterval(() => {
  window.navigator.vibrate(200)
},1000) */

/* let test = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=0d11d7637efffedbd53ee0ee1ee90aa4`
)
.then(res => res.json())
.then(data => data);

console.log(test); */



//AIzaSyDOuxr5zhrFVF5-7I7Yi6mXMxg3p0OhSoo

// Initialize and add the map


