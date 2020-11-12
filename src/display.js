import React from 'react';
import Draggable from 'react-draggable'
import API from "./api"
import Weather from "./Weather"
import "./App.css"

const key = "c6c20174beb98a67e203bee492b16780"
class Display extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        icon:undefined,
        error: undefined
      }
      getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=fr&units=metric&appid=${key}`);
        const data = await  api_call.json();
        if (city && country) {
          console.log(data)
          this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            error: ""
          });
        } else {
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            description: undefined,
            icon:undefined,
            error: "unrecognized city or country"
        });
      }
    }
    render() {
        return (
          <div>
            <Draggable>
              <div className="container">
                <div className="split">
                  <API getWeather={this.getWeather}/>
                  <button onClick={this.props.toggleVisibility}> fermer </button>
                  <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error}
                  icon={this.state.icon} />
                </div>
              </div>
            </Draggable>
          </div>
        )
    }
}

export default Display