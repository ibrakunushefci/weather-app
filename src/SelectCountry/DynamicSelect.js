import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
   root: {
     color: 'white',
     width: '180px'
   },
});

class DynamicSelect extends Component {
   handleChange = (event) => {
      let selectedValue = event.target.value;
      this.props.onChange(selectedValue);
   }

   render() {
      const { classes } = this.props;
      
      let arrayOfData = this.props.arrayOfData;

      let options = arrayOfData.map((data) =>
         <MenuItem key={uuidv4()} value={data.name}>
            {data.name}
         </MenuItem>
      );

      return (
         <FormControl className={classes.root}>
            <InputLabel id={uuidv4()} className={classes.root}>Select country</InputLabel>
            <Select onChange={this.handleChange} className={classes.root}>
               {options}
            </Select>
            {/* <select>
               <option>Option 1</option>
               <option>Option 2</option>
               <option>Option 3</option>
               <option>Option 4</option>
            </select> */}
         </FormControl>
      )
   }
}

DynamicSelect.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DynamicSelect);