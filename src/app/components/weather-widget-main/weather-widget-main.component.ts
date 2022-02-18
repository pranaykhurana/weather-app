import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData: any;
  myLat: any;
  myLong: any;

  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    };
    this.askLocationPerm();
  }

  getWeatherData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b961030119da85d46f41dac76cf4e69a")
      .then(res => console.log(res));
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius= this.convertToCelcius(this.WeatherData.main.temp).toFixed(0);
    this.WeatherData.temp_min = this.convertToCelcius(this.WeatherData.main.temp_min).toFixed(0);
    this.WeatherData.temp_max = this.convertToCelcius(this.WeatherData.main.temp_max).toFixed(0);
    this.WeatherData.temp_feels_like = this.convertToCelcius(this.WeatherData.main.feels_like).toFixed(0);
  }

  convertToCelcius(temp: number) {
    return temp - 273.15;
  }

  askLocationPerm() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setLocation(position.coords.latitude, position.coords.longitude);
        this.getWeatherData()
      },
      function (error) {
        if(error.code == error.PERMISSION_DENIED) alert("Please allow location permissions to see your weather");
      });
    }
    else {
      if (document.getElementById("GeoAPI")) {
        // @ts-ignore
        document.getElementById("GeoAPI").innerHTML = "I'm sorry but geolocation services are not supported by your browser";
        // @ts-ignore
        document.getElementById("GeoAPI").style.color = "#FF0000";
      }
    }
  }

  setLocation(lat: any, long: any) {
    this.myLat = lat;
    this.myLong = long;
  }

}
