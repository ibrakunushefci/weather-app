import React from 'react';
import '../../src/WeatherApp/Weather.css';
import '../../src/WeatherAnimations/Sunny.scss';
import '../../src/WeatherAnimations/RainAnimation.scss';
import '../../src/WeatherAnimations/CloudAnimations.scss';
import Button from '@material-ui/core/Button';
import WeatherCard from '../../src/WeatherApp/WeatherCard';
import DynamicSelect from '../../src/SelectCountry/DynamicSelect';
import { arrayOfData } from '../../src/SelectCountry/CountyList';

export default class Weather extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: false,
         items: [],
         selectedValue: ''
      };
   }
   
   componentDidMount() {
      fetch("http://api.weatherapi.com/v1/forecast.json?key=ca021cd2c43544e0be7112719202206&q=kosovo&days=3")
      .then(res => res.json())
      .then(
         (result) => {
            this.setState({
               isLoaded: true,
               items: result
            });
         },
         (error) => {
            this.setState({
               isLoaded: true,
               error
            });
         }
      );
   }

   handleChange = (selectedValue) => {
      this.setState({
         selectedValue: selectedValue
      });
   }

   handleSubmit = (e) => {
      this.loadHandleChange(this.state.selectedValue);
      e.preventDefault();
   }

   loadHandleChange = () => {
      let thisUrl = "http://api.weatherapi.com/v1/forecast.json?key=ca021cd2c43544e0be7112719202206&q="+this.state.selectedValue+"&days=3"
      console.log("New url " + thisUrl)
      fetch(thisUrl)
      .then(res => res.json())
      .then(result => {
         this.setState({
            isLoaded: true,
            items: result,
         });
      });
   }

   render() {
      const { error, isLoaded, items } = this.state;

      if (error) {
         return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
         return <div>Loading...</div>;
      }
      else {
         return (
            <>
               <WeatherCard items={items} />

               <form className="searchForm" onSubmit={this.handleSubmit}>
                  <DynamicSelect arrayOfData={arrayOfData} onChange={this.handleChange} />
                  <Button variant="contained" color="primary" className="submitButton" onClick={this.handleSubmit} disabled={this.state.selectedValue ? 'http://api.weatherapi.com/v1/forecast.json?key=ca021cd2c43544e0be7112719202206&q=&days=3' : this.state.selectedValue}>
                     Submit
                  </Button>
               </form>
            </>
         );
      }
   }
}