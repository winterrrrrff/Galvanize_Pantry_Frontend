import React, {Component } from "react";
import MultiSelect from "react-multi-select-component";
import {Typography} from '@material-ui/core';

// Reference:  https://github.com/harshzalavadiya/react-multi-select-component 

class MultiSelectBox extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        selected: false,
        selectedItems: []
      };
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange=(selectedItems)=> {
    this.setState({ selectedItems });
    this.props.callbackFromParent(selectedItems);
    
  }
  render() {
    const {content, options,handleChange,name} = this.props
    const {selectedItems} = this.state;
    return (
        <div>
          <Typography variant="h4"
                        style={{
                          color: "#785cab", 
                          fontWeight: "bold",
                          align: "centre",
                          fontSize: "14px",
                          marginTop: "2rem",
                          marginBottom: "2rem"
                        }}>
                          {content}
          </Typography>
         
          <MultiSelect
            options={options}
            value={selectedItems}
            onChange={this.handleChange}
            //onChange={handleChange}
            labelledBy={"Select"}
          />
        </div>
      );

  }
}

export default MultiSelectBox;