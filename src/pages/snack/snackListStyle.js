import styled from "styled-components";

export const SnackContent = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  justify-content: space-around;
`;

export const SnackListContainer = styled.div`
  width: 80%;
  margin-bottom: 90px;
  display: flex;
  flex-wrap: wrap;

  // border: 1px solid red;
  @media only screen and (max-width: 785px) {
    width: 70%;
  }
`;
