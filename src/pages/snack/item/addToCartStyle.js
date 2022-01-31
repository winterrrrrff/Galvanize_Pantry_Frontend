import styled from "styled-components";
import increasePic from "statics/increase.png";
import decreasePic from "statics/decrease.png";
import addToCartPic from "statics/addToCart.png";

export const AddToCartContainer = styled.div`
  width: 100%;
  height: 25px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

    // border: 1px solid red;
  @media only screen and (max-width: 785px) {
    // width: 60%;
    height: 40px;
  }
`;

export const Amount = styled.div`
  width: 30px;
  height: 80%;
  font-size: 20px;
  text-align: center;

  // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    width: 30px;
    height: 20px;
  }
`;

export const Modifier = styled.div`
  width: 22px;
  height: 22px;
  margin-left: 10px;

  // border: 1px solid blue;
  @media only screen and (max-width: 785px) {
    width: 30px;
    height: 20px;
  }
`;

const ModifierButton = styled.button`
  // width: 50%;
  height: 90%;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 6px;
  background-color: white;
  &:hover {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
  }
  // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    height: 80%;
  }
`;

export const IncreaseButton = styled(ModifierButton)`
  // background-image: url(${increasePic});
`;

export const DecreaseButton = styled(ModifierButton)`
  // background-image: url(${decreasePic});
`;

export const AddToCartButton = styled.div`
  width: 22px;
  height: 22px;
  margin-left: 15px;
  border-radius: 6px;

  background-image: url(${addToCartPic});
  background-repeat: no-repeat;
  background-size: contain;

  &:hover {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
`;
