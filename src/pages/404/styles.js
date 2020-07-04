import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background-color: #412a62;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  overflow: hidden;

  position: relative;

  @media (max-width: 1767px) {
    .android {
      width: 700px;
    }
  }

  @media (max-width: 1440px) {
    .android {
      width: 500px;
    }
  }

  @media (max-width: 1130px) {
    align-items: center;

    .android {
      width: 250px;
    }
  }

  @media (max-width: 970px) {
    .android {
      width: 175px;
      top: 471px !important;
      height: 300px;
    }
  }
`;

export const Content = styled.div`
  margin: 25px 153px;
  width: 50%;
  align-self: flex-end;

  @media (max-width: 1130px) {
    width: 80%;
  }

  @media (max-width: 968px) {
    width: unset;
    align-self: unset;
    margin: 25px 25px;
  }
`;

export const Label = styled.label`
  font-family: "Montserrat-SemiBold";
  font-size: 175px;
  line-height: 213px;
  color: #ffffff;

  @media (max-width: 1100px) {
    font-size: 100px;
    line-height: 141px;
  }

  @media (max-width: 768px) {
    font-size: 60px;
    line-height: 100px;
  }
`;

export const H1 = styled.h1`
  font-family: "Montserrat-Regular";
  font-size: 52px;
  line-height: 63px;
  color: #ffffff;
  margin-top: -30px;

  @media (max-width: 768px) {
    font-size: 30px;
    line-height: 52px;
  }
`;

export const Comment = styled.p`
  font-family: "Montserrat-Regular";
  font-size: 30px;
  line-height: 42px;
  color: #ffffff;

  margin-top: 57px;

  @media (max-width: 768px) {
    font-size: 19px;
    line-height: 33px;
    margin-top: 38px;
  }
`;

export const Button = styled(Link)`
  font-family: "Montserrat-Medium";
  font-size: 26px;
  line-height: 26px;
  color: #ffffff;
  text-transform: uppercase;

  background-color: #e0bb30;

  border-radius: 10px;
  border: 0;

  padding: 22px 51px;

  margin-top: 64px;

  text-align: center;

  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
