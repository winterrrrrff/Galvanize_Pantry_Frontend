import React, { Component } from "react";
import {
  AddToCartContainer,
  Amount,
  Modifier,
  IncreaseButton,
  DecreaseButton,
  AddToCartButton,
} from "./addToCartStyle";

import { connect } from "react-redux";
import { actionCreators } from "../store/snackStore";

class AddToCartComp extends Component {
  constructor(props) {
    super(props);
    const {it} = this.props;
    
    this.state = {
      count: 1,
      id: it.get("snack_Id"),
      name: it.get("name"),
      image: it.get("image_url"),
      price: it.get("price"),
      quantity: it.get("quantity"),
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    // this.addToCart = this.addToCart.bind(this);
  }
  render() {
    return (
      <AddToCartContainer>
        <DecreaseButton onClick={this.decrease} > &lt; </DecreaseButton>
        <Amount>{this.state.count}</Amount>
        <IncreaseButton onClick={this.increase} > &gt; </IncreaseButton>
        <AddToCartButton
          onClick={() => this.props.addToCart(this.state)}
        />
      </AddToCartContainer>
    );
  }

  increase() {
    if (this.state.count == this.state.quantity) {
      alert('There is no enough stock in the inventory.');
    } else {
      this.setState((state, props) => ({
        count: state.count + 1,
      }));
    }
  }

  decrease() {
    if (this.state.count <= 1) {
      alert("The item number can not be less than 1.");
    } else {
      this.setState((state, props) => ({
        count: state.count - 1,
      }));
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart(item) {
      dispatch(actionCreators.addToCart(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartComp);

// this.props.addToCart(this.state.item);
