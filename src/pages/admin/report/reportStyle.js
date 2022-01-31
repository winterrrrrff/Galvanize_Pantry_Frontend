import logoPic from "statics/snackLogo.png";
import styled from "styled-components";

export const Logo = styled.div`
  float: left;
  display: flex;
  width: 306px;
  height: 63px;
  background: url(${logoPic});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0px;
  position:relative; left:5%; 
  margin-top: -5%;
  margin-left: -5%;

  // border: 1px solid black;
`;

export const ReportBtn = styled.div`
  margin-top: 20px;
  //margin-right:55px;
  padding: 20px;
  font-size: 25px;
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
export const Title = styled.div`
  width: 100px;
  height: 40px;
  font-size: 40px;
  text-align: center;
  //align-self: center;
  color: #e6a34b;

  // border: 1px solid yellow;
`;

export const MidContainer = styled.div`
  width: 600px;
  height: 100px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  // border: 1px solid green;
`;