import React from 'react';
import WeatherCard from './WeatherCard';
import DynamicSelect from '../SelectCountry/DynamicSelect';
import { arrayOfData } from '../SelectCountry/CountyList';
import { Form, Button } from 'react-bootstrap';

import AOS from 'aos';
import 'aos/dist/aos.css';

import '../../src/WeatherApp/Weather.css';
import '../../src/WeatherAnimations/Sunny.css';
import '../../src/WeatherAnimations/RainAnimation.scss';
import '../../src/WeatherAnimations/CloudAnimations.css';

class App extends React.Component {
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
      this.loadHandleChange();

      AOS.init({duration: 2000})
   }

   handleChange = (selectedValue) => {
      this.setState({
         selectedValue: selectedValue
      })
   }

   loadHandleChange = () => {
      const checkUrl = !this.state.selectedValue ? "Albania" : this.state.selectedValue
      const newRequest = `https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/forecast.json?key=ca021cd2c43544e0be7112719202206&q=${checkUrl}&days=3`
      fetch(newRequest)
         .then(res => res.json())
         .then(
            (result) => {
               this.setState({
                  isLoaded: true,
                  items: result,
               })
            },
            (error) => {
               this.setState({
                  isLoaded: true,
                  error
               })
            }
         )
   }

   handleSubmit = (e) => {
      this.loadHandleChange(this.state.selectedValue);
      e.preventDefault()
   }

   render() {
      const { error, isLoaded, items } = this.state;

      if (error) {
         return <div>Error: {error.message}</div>
      }
      else if (!isLoaded) {
         return <div style={{color: "#fff"}}>Loading...</div>
      }
      else {
         return (
            <>
               <WeatherCard items={items}/>

               <Form className="searchForm">
                  <DynamicSelect arrayOfData={arrayOfData} onChange={this.handleChange} />
                  <Button variant="info" className="submitButton" onClick={this.handleSubmit}>Submit</Button>
               </Form>
            </>
         );
      }
   }
}

export default App
