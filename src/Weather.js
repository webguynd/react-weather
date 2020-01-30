import React from 'react'

class Weather extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: null,
            iconSrc: null,
            currentTemp: null,
           
        }
        this.getCurrentLocation = this.getCurrentLocation.bind(this)
    }
    
    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                .then(response => response.json())
                .then(data => this.setState({
                    description: data['weather'][0]['description'],
                    iconSrc: data['weather'][0]['icon'],
                    currentTemp: data['main']['temp']
                }))
        })
    }
    componentDidMount() {
        this.getCurrentLocation();
    }

    render() {
        return(
            <div className="conter text-center text-white mt-5">
                <h1>React Weather</h1>
                <h3>Currently it is: <img src={this.state.iconSrc} alt="weather icon"></img> {this.state.description} and {this.state.currentTemp} degrees</h3>
            </div>
        )
    }
}
export default Weather