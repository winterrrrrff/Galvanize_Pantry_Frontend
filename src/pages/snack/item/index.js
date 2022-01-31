import React, { Component } from "react";
import AddToCartComp from "./AddToCartComp";

import {
  SmallItemBox,
  ItemInfoBox,
  ItemImgBox,
  ItemImg,
  ItemName,
  ItemPrice,
  ActionLine,
  ItemQuantity,
} from "./itemStyle";

class Item extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      item: item,
    };
  }

  componentDidUpdate(prevProps) {
    // when the quantity is diffdrent, re-render by updating state
    if (this.state.item.get('quantity') !== this.props.item.get('quantity')){
      this.setState((state, props) => {
        return {item: this.props.item}
      })
    }
  }

  render() {
    const item = this.state.item;
    const id = item.get("snack_Id");
    const img = item.get("image_url");
    const name = item.get("name");
    const price = item.get("price");
    const quantity = item.get("quantity");
    return (
      <SmallItemBox>
        <ItemImgBox>
          <ItemImg src={img} alt={name} />
        </ItemImgBox>
        <ItemInfoBox>
          <ItemName>
            {name}
          </ItemName>
          <ItemPrice>${price}</ItemPrice>
          <ItemQuantity>({quantity} left)</ItemQuantity>
        </ItemInfoBox>
        <ActionLine>
          {quantity > 0 ? <AddToCartComp it={item} /> : <span>Not available</span>}
        </ActionLine>
      </SmallItemBox>
    );
  }
/*
  changeVote() {
    const item = this.state.item;
    let newItem;
    if (item.get("vote") === 0) {
      newItem = item.set("vote", 1);
    } else {
      newItem = item.set("vote", 0);
    }
    this.setState((state, props) => ({
      item: newItem,
    }));
    // TODO: static userid
    const userid = 1;
    this.props.update(newItem.get("snack_Id"), userid);
  }
  */
}
/*
const mapDispatchToProps = (dispatch) => {
  return {
    update(id, userid) {
      dispatch(actionCreators.updateVote(id, userid));
    },
  };
};
*/

export default Item;
