import styled from "styled-components";
import logoPic from "statics/snackLogo.png";

export const Main = styled.div`
  margin-top: 10%;

  display: flex;
  flex: 1 1 500px;
  flex-flow: row wrap;
  justify-content: space-around;

  // border: 1px solid red;
`;

export const Logo = styled.div`
  float: left;
  margin-top: 50px;
  width: 480px;
  height: 170px;
  background: url(${logoPic});
  background-repeat: no-repeat;
  background-size: contain;

  // border: 1px solid black;
`;

export const LoginPanel = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Label = styled.label`
  color: #e6a34b;
  font-size: 30px;

  // border: 1px solid red;
`;

export const BtnGroup = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-self: center;

  // border: 1px solid green;
`;

export const EmployeeLoginRow = styled.div`
  
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  float: left;
 
  
`;
export const EmployeeLoginBtn = styled.div`
  margin-top: 1px;
  width: 100px;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  border-radius: 50px;
  position:relative; right:0%; 
  background: #785cab;
  color: #e6a34b;

  &.focused {
    background: #e6a34b;
    color: #785cab;
  }
`;
