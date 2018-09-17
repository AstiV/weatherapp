// https://www.youtube.com/watch?v=204C9yNeOYI&amp=&t=5s

import React from "react";

import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather";

const API_KEY = "3603f31264a30e5931db037c359a1b25";

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    };

    _getWeather = async event => {
        // use event.preventDefault() to prevent a full page refresh
        // full page refresch leads to console.log being shown only very briefly!
        event.preventDefault();

        // use the event object to get form input by element name
        const city = event.target.elements.city.value;
        const country = event.target.elements.country.value;

        // Api call
        const api_call = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
        );
        // convert response to JSON format
        const data = await api_call.json();

        // if statement prevents app from breaking if user does not provide input
        // before clicking submit
        if (city && country) {
            console.log(data);

            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter the values!"
            });
        }
    };

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="title-container">
                            <Titles />
                        </div>
                        <div className="form-container">
                            <Form getWeather={this._getWeather} />
                            <Weather
                                temperature={this.state.temperature}
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
