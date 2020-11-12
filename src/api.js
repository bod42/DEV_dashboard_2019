import React from "react"

class API extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
            <input className="input" type="text" name="city" placeholder="City..."/>
            <input className="input" type="text" name="country" placeholder="Country..."/>
            <button className="button">Get Weather</button>
            </form>
            );
        }
    }
export default API