import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Alert from "./components/Alert";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const LoginContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #dee2e6;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  p {
    font-size: 20px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #007bff;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
`;

const FormItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 20px;
  margin-top: 15px;
  display: inline-block;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0056b3;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, user, showAlert, displayAlert } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      displayAlert();
      return;
    }
    loginUser({ username, password });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user]);
  return (
    <Container>
      <LoginContainer>
        <Title>Login</Title>
        <FormItem>
          <Label>Username:</Label>
          <Input type="text" value={username} onChange={handleUsernameChange} />
        </FormItem>
        <FormItem>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormItem>
        {showAlert && <Alert />}
        <Button onClick={handleLogin}>Login</Button>
        <p>
          Not a user? <RegisterLink href="/register">Register</RegisterLink>
        </p>
      </LoginContainer>
    </Container>
  );
};

export default Login;
