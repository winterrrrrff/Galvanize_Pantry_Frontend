import styled from "styled-components";
import logoPic from "statics/snackLogo.png";

export const Logo = styled.div`
  float: left;
  width: 480px;
  height: 170px;
  background: url(${logoPic});
  background-repeat: no-repeat;
  background-size: contain;
  // border: 1px solid black;
`;

export const BtnGroup = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-self: center;
  position: right;
  right: -25%;

  // border: 1px solid green;
`;

export const LoginBtn = styled.div`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  border-radius: 20px;
  background: #785cab;
  color: #e6a34b;
  // border: 1px solid black;

  &.focused {
    background: #e6a34b;
    color: #785cab;
  }
`;
