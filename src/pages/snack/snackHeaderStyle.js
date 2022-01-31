import styled from "styled-components";
import logoPic from "statics/snackLogo.png";
import searchPic from "statics/searchIcon.png";
import cartPic from "statics/cart.jpg";

export const SnackHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  // height: 100px;
  flex-flow: row wrap;
  justify-content: space-between;
  // min-width: 1105px;

  // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    
  }
`;

export const LogoThumb = styled.div`
  // width: 300px;
  width: 20%;
  height: 100px;

  // border: 1px solid red;
  @media only screen and (max-width: 785px) {
    width: 100%;
  }
`;

export const LogoImg = styled.img`
  // width: 306px;
  width: 100%;
  height: 100%;

  background-image: url(${logoPic});
  background-repeat: no-repeat;
  background-size: contain;
  @media only screen and (max-width: 785px) {
    width: 100%;
    background-position: center;
  }

`;

export const MidContainer = styled.div`
  // width: 600px;
  width: 50%;
  height: 100px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    flex: 1;
    // width: 80%;
  }
`;

export const Title = styled.div`
  // width: 100px;
  width: 100%;
  height: 40px;
  font-size: 40px;
  text-align: center;
  align-self: center;

  // border: 1px solid yellow;
  @media only screen and (max-width: 785px) {
    font-size: 30px;
  }
`;

export const SearchBar = styled.div`
  // width: 500px;
  width: 80%;
  height: 44px;
  align-self: center;
  border-radius: 10px;

  display: flex;

  border: 1px solid #7f39fb;

  @media only screen and (max-width: 785px) {

    // width: 90%;
  }
`;

export const SearchInput = styled.input.attrs({
  placeholder: "Search snack",
})`
  // width: 450px;
  width: 100%;
  // height: 100%;
  border-radius: 10px;
  font-size: 20px;

  border: none;
`;

export const SearchButton = styled.div`
  width: 44px;
  height: 44px;

  background-image: url(${searchPic});
  background-repeat: no-repeat;
  background-size: contain;

  // border: 1px solid red;
`;

export const NavPart = styled.div`
  // width: 200px;
  width: 15%;
  height: 100px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  // border: 1px solid blue;
  @media only screen and (max-width: 785px) {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 80px;
    // width: 80px;
  }
`;

export const ShopCart = styled.div`
  width: 80px;
  height: 80px;

  position: relative;
  background-image: url(${cartPic});
  background-repeat: no-repeat;
  background-size: contain;

  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  // border: 1px solid red;
  
  @media only screen and (max-width: 785px) {
    width: 75px;
    // flex: 1;
    // width: 60px;
    // height: 60px;
    // float: right;
  }
`;

export const ShopCartItemCount = styled.label`
  width: 25px;
  height; 35px;
  font-size: 40px;

  position: absolute;
  bottom: 0;
  right: -5px;

  // border: 1px solid black;
  @media only screen and (max-width: 785px) {
    font-size: 30px;
  }
`;

export const OrderLogo = styled.div`
    width: 90px;
    height; 80px;
    font-size: 35px;
    // padding-top: 20px;
    
    // align-self: center;

    // border: 1px solid green;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
`;
