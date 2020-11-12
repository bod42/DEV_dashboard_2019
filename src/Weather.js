import React from "react";

class Weather extends React.Component {
    render() {
        return (
            <div>
              {this.props.city && this.props.country && <p className="serif">Location:  {this.props.city}, {this.props.country}</p>}
              {this.props.temperature && <p className="serif">Temperature:  {this.props.temperature} °C</p>}
              {this.props.description && <p className="serif">Conditions: {this.props.description}</p>}
              {this.props.icon && <img className="img" alt="Sweather" src={`http://openweathermap.org/img/w/${this.props.icon}.png`}/>}
              {this.props.error && <p className="serif">{this.props.error}</p>}
            </div>
        )
    }
}

export default Weather