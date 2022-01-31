import styled from "styled-components";

export const SnackContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;

  // border: 1px solid green;
`;
export const SnackFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75px;
  box-shadow: 0px 1px 5px 5px #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0px 0 10px;
  box-sizing: border-box;
  background-color: white;

  @media only screen and (max-width: 785px) {
    height: 65px;
  }
`;
