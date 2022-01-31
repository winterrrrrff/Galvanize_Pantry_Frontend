import styled from "styled-components";
import logoPic from "statics/snackLogo.png";

export const Main = styled.div`
  margin-top: 1%;
  display: flex;
  flex: 1 1 500px;
  flex-flow: row wrap;
  justify-content: space-around;

  // border: 1px solid red;
`;

export const Logo = styled.div`
  float: left;
  display: flex;
  width: 306px;
  height: 63px;
  background: url(${logoPic});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0px;
  position:relative; left:-1%; 
  

  // border: 1px solid black;
`;

export const EPanel = styled.div`
  
  width: 480px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10%;
  float: left;
  position:relative; left:-25%; 
 
  
`;

export const Label = styled.label`
  color: #e6a34b;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  margin-top: 8%;
  float: left;
  position:relative; left:-25%; 
  justify-content: space-between
 
  // border: 1px solid red;
`;

export const BtnGroup = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  margin-top: 20%;
  margin-left: 40%;
  float: left;
  position:relative; left:0%; 

  // border: 1px solid green;
`;

export const EBtn = styled.div`
  margin-top: 20px;
  margin-right:55px;
  padding: 60px;
  font-size: 30px;
  text-align: center;
  border-radius: 100px;
  background: #785cab;
  color: #e6a34b;
  // border: 1px solid black;

  &.focused {
    background: #e6a34b;
    color: #785cab;
  }
`;

export const LogOutBtn = styled.div`
  margin-top: 0px;
  //width: 20px
  padding: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 80px;
  position:relative; right:0%;
  //margin-bottom: 0%; 
  background: #785cab;
  //flex-direction: column-reverse;
  color: #e6a34b;
  // border: 1px solid black;

  &.focused {
    background: #e6a34b;
    color: #785cab;
  }
`;

