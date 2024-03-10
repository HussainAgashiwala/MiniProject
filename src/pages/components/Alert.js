import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";

const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) =>
    props.alertType === "success" ? "#d4edda" : "#f8d7da"};
  color: ${(props) => (props.alertType === "success" ? "#155724" : "#721c24")};
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Alert = () => {
  const { alertType, alertText } = useAppContext();

  return alertText ? (
    <AlertContainer alertType={alertType}>{alertText}</AlertContainer>
  ) : null;
};

export default Alert;
