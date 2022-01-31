import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store/snackStore";
import {
  SideCategoryBar,
  CategoryItem,
  SelectedCategoryItem,
} from "./sideCategoryStyle";

class SideCategory extends Component {
  render() {
    // console.log(JSON.stringify(this.props.cates));
    return (
      <SideCategoryBar>
        {this.props.cates.map((cate, index) => {
          const cateId = cate.get('category_id');
          const cateName = cate.get('name');
          return cateId === this.props.currCate ? (
            <SelectedCategoryItem
              key={cateId}
              onClick={(e) => this.searchByCate(cateId)}
            >
              {cateName}
            </SelectedCategoryItem>
          ) : (
            <CategoryItem
              key={cateId}
              onClick={(e) => this.searchByCate(cateId)}
            >
              {cateName}
            </CategoryItem>
          );
        })}
      </SideCategoryBar>
    );
  }

  searchByCate(str) {
    this.props.search(str);
  }

  componentDidMount() {
    this.props.listCate();
  }
}

const mapStateToProps = (state) => {
  return {
    cates: state.snack.get("categories"),
    currCate: state.search.searchByCate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search(cate) {
      dispatch(actionCreators.searchByCategory(cate));
    },
    listCate() {
      dispatch(actionCreators.getCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideCategory);
