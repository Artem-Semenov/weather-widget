"use strict";

import City from "https://artem-semenov.github.io/weather-widget/modules/City.js";

/* async function fetch1() {
  let a = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=0d11d7637efffedbd53ee0ee1ee90aa4"
  );
  return a.json();
}
async function fetch2() {
  let b = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=0d11d7637efffedbd53ee0ee1ee90aa4"
  );
  return b.json();
}
async function fetch3() {
  let c = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Uzhgorod&appid=0d11d7637efffedbd53ee0ee1ee90aa4"
  );
  return c.json();
}

async function fetchAll() {
  let a = await fetch1();
  console.log(1, a);
  let b = await fetch2();
  console.log(2, b);
  let c = await fetch3();
  console.log(3, c);
}

 */

class Widget {
  constructor(id) {
    this.wrapperElement = document.getElementById(id);
  }
  citiesList = [];

  Init = async (...args) => {
    this.createCitiesList(...args).forEach((item) => {
      this.citiesList.push(item);
    });

    this.Render();
  };

  createCitiesList = (...args) => {
    console.log("creating list started");
    return args.map((el) => {
      let item = new City(el.trim());
      return item;
    });
  };

  Render = async () => {
    console.log("rendering started");
    this.citiesList.forEach(async (el) => {
      await el.DOM();
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
      console.log("FALSE");
      alert("City is already on the stage");
      return;
    } else {
      let city = new City(this.input);

      city
        .renderCity(this.wrapperElement)
        .then((res) => this.citiesList.push(res));
    }
  };

  addEventListener = (btnId, inputId, clearBtnId) => {
    this.clearBtn = document.getElementById(`${clearBtnId}`);
    this.submitBtn = document.getElementById(`${btnId}`);
    this.submitBtn.addEventListener("click", (e) => {
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

console.log(weatherWidget, secondWeatherWidget);
