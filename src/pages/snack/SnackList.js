import React, { Component } from "react";
import { SnackListContainer, SnackContent } from "./snackListStyle";
import Item from "./item";
import SideCategory from "./SideCategory";
import { connect } from "react-redux";
import { actionCreators } from "./store/snackStore";

class SnackList extends Component {
  render() {
    const query = this.props.query;
    const category = this.props.cate;
    return (
      <SnackContent>
        <SnackListContainer>
          {this.props.items.map((it, index) => {
            const name = it.get("name");
            const cate = it.get("category_id"); 
            if (query !== "" && category !== 0) {
              if (name.includes(query) && category === cate) {
                return <Item item={it} key={index} />;
              }
            } else if (query !== "") {
              if (name.includes(query)) {
                return <Item item={it} key={index} />;
              }
            } else if (category !== 0) {
              if (category === cate) {
                return <Item item={it} key={index} />;
              }
            } else {
              return <Item item={it} key={index} />;
            }
          })}
        </SnackListContainer>
        <SideCategory />
      </SnackContent>
    );
  }

  componentDidMount() {
    this.props.getList();
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.snack.get("items"),
    query: state.search.searchByName,
    cate: state.search.searchByCate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getList() {
      dispatch(actionCreators.getSnacks());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackList);
