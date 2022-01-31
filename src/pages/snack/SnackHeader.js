import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  SnackHeaderContainer,
  LogoThumb,
  LogoImg,
  MidContainer,
  Title,
  SearchBar,
  SearchInput,
  SearchButton,
  NavPart,
  ShopCart,
  ShopCartItemCount,
  OrderLogo,
} from "./snackHeaderStyle";

import { connect } from "react-redux";
import { actionCreators } from "./store/snackStore";
import * as api from "../../api";

class SnackHeader extends Component {
  render() {
    let count = this.props.itemCount;
    if (!this.props.itemCount) {
        count = 0;
    }
    return (
      <SnackHeaderContainer>
        <LogoThumb>
          <Link to="/"  onClick={api.logout}>
            <LogoImg />
          </Link>
        </LogoThumb>
        <MidContainer>
          <Title>Snacks</Title>
          <SearchBar>
            <SearchInput onChange={(e) => this.search(e.target.value)} />
            <SearchButton />
          </SearchBar>
        </MidContainer>
        <NavPart>
          <Link to="/cart">
            <ShopCart>
              <ShopCartItemCount>{count}</ShopCartItemCount>
            </ShopCart>
          </Link>
        </NavPart>
      </SnackHeaderContainer>
    );
  }

  // dumb way to get the input value.
  search(str) {
    this.props.search(str);
  }

}

const mapStateToProps = (state) => {
  return {
    itemCount: state.cart.get("cartItem").length,
    items: state.snack.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search(query) {
      dispatch(actionCreators.searchByName(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackHeader);
