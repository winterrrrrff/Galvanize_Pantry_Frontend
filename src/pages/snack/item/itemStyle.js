import styled from "styled-components";
import votedPic from "statics/voted.jpg";
import unvotedPic from "statics/unvoted.jpg";

export const SmallItemBox = styled.div`
  width: 168px;
  height: 266px;
  margin-top: 20px;
  margin-left: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    border: 2px solid #e6a34b;
  }

  // border: 1px solid gray;

  @media only screen and (max-width: 785px) {
    width: 100%;
    height: 150px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
`;

export const ItemImgBox = styled.div`
  width: 100%;
  height: 176px;
  position: relative;

  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  // border-bottom: 3px solid gray;

  @media only screen and (max-width: 785px) {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 100px;
    height: 100px;
  }
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 176px;

  @media only screen and (max-width: 785px) {
    // width: 100%;
    height: 100px;
  }
`;

export const ItemInfoBox = styled.div`
  width: 100%;
  height: 264px;

  // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    flex: 1;
    height: 100px;
  }
`;

// const ActionButton = styled.div`
//   width: 30px;
//   height: 22px;
//   position: absolute;
//   bottom: 0;
//   right: 0;

//   background-repeat: no-repeat;
//   background-size: contain;

//   // border: 1px solid blue;

//   @media only screen and (max-width: 785px) {
//     width: 15px;
//     height: 11px;
//   }
// `;

// export const VotedButton = styled(ActionButton)`
//   background-image: url(${votedPic});
// `;

// export const UnvotedButton = styled(ActionButton)`
//   background-image: url(${unvotedPic});
// `;

export const ItemName = styled.div`
  width: 100%;
  height: 24px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: black;
  text-align: center;

  // border: 1px solid blue;
  @media only screen and (max-width: 785px) {
    // height: 12px;
    font-size: 24px;
  }
`;

export const ItemPrice = styled(ItemName)`
  font-size: 18px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  // border-bottom: 2px solid gray;
  @media only screen and (max-width: 785px) {
    font-size: 22px;
  }
`;

export const ItemQuantity = styled.div`
  font-size: 12px;
  // box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
  //   0px 1px 3px rgba(0, 0, 0, 0.2);
  // border-bottom: 2px solid gray;
  @media only screen and (max-width: 785px) {
    font-size: 12px;
  }
`;

export const ActionLine = styled.div`
  width: 100%;
  height: 34px;

  display: flex;
  justify-content: flex-end;

  // box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
  //   0px 1px 3px rgba(0, 0, 0, 0.2);
  
    // border: 1px solid green;
  @media only screen and (max-width: 785px) {
    height: 40px;
    // box-shadow: none;
  }
`;
