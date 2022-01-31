import styled from "styled-components";

export const SideCategoryBar = styled.div`
  width: 12%;
  height: 100%;
  // min-width: 50px;

  display: flex;
  flex-direction: column;

  // border: 1px solid black;
  // @media only screen and (max-width: 785px) {
  //   width: 8%;
  // }
`;

export const CategoryItem = styled.label`
  width: 100%;
  // height: 20px;

  margin-bottom: 20px;
  font-size: 20px;
  color: #e6a34b;

  &:hover {
    border-left: 10px solid #e6a34b;
    border-bottom: 1px solid #e6a34b;
  }
  border-bottom: 1px solid #e6a34b;

  @media only screen and (max-width: 785px) {
    font-size: 16px;
  }
`;

export const SelectedCategoryItem = styled(CategoryItem)`
  border-left: 10px solid #7f39fb;
  border-bottom: 2px solid #7f39fb;
`;
