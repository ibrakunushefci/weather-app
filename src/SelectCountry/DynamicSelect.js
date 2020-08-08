import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class DynamicSelect extends Component {
   handleChange = (e) => {
      const selectedValue = e.target.value;
      this.props.onChange(selectedValue);
   }

   render() {
      const arrayOfData = this.props.arrayOfData;
      const options = arrayOfData.map((data) =>
         <option value={data.name} key={data.id}>
            {data.name}
         </option>
      );

      return (
         <Form.Group controlId="formBasicRangeCustom">
            <Form.Control onChange={this.handleChange} as="select" size="sm">
               {options}
            </Form.Control>
         </Form.Group>
      )
   }
}

export default DynamicSelect;