import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(15),
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
    //theme.spacing(2),
  },
}));

export const SingleSelect = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label"> 
          
                          {props.title}
          </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          //value={age}
          onChange={handleChange}
        >
          <Typography variant="h4"
                        style={{
                          color: "#785cab", 
                          fontWeight: "bold",
                          align: "centre",
                          fontSize: "14px",
                          marginTop: "2rem",
                          marginBottom: "2rem"
                        }}>
                          {props.title}
          </Typography>
          
          <MenuItem value={10}>Newly Recommend</MenuItem>
          <MenuItem value={20}>Existing Snack</MenuItem>
          <MenuItem value={30}>All</MenuItem>
        </Select>
        <FormHelperText>Choose to lookup the voting for the existing snacks or newly added recommendations of snacks</FormHelperText>
      </FormControl>
    </div>
  );
}
