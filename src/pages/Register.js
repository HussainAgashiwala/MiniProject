import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Alert from "./components/Alert";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const RegisterContainer = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const Icon = styled.span`
  margin-right: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8d7da;
  padding: 12px;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  margin: 10px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f3b7bb;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #bd2130;
  }
`;

const LoginLink = styled.a`
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

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, user, showAlert, displayAlert } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [vinNumbers, setVinNumbers] = useState([]);
  const [vinInput, setVinInput] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVinInputChange = (e) => {
    setVinInput(e.target.value);
  };

  const handleAddVin = () => {
    if (vinInput.trim() !== "") {
      setVinNumbers([...vinNumbers, vinInput.trim()]);
      setVinInput("");
    }
  };

  const handleDeleteVin = (index) => {
    const updatedVins = [...vinNumbers];
    updatedVins.splice(index, 1);
    setVinNumbers(updatedVins);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password || vinNumbers.length === 0) {
      displayAlert();
      return;
    }
    registerUser({ username, password, vinNumbers });
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
      <RegisterContainer>
        <Title>Register</Title>
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
        <FormItem>
          <Label>VIN Numbers:</Label>
          <Input type="text" value={vinInput} onChange={handleVinInputChange} />
          <Button onClick={handleAddVin}>
            <Icon>
              <FaPlus />
            </Icon>
            Add VIN
          </Button>
          <List>
            {vinNumbers.map((vin, index) => (
              <ListItem key={index}>
                {vin}
                <DeleteButton onClick={() => handleDeleteVin(index)}>
                  <FaTrash />
                </DeleteButton>
              </ListItem>
            ))}
          </List>
        </FormItem>
        {showAlert && <Alert />}
        <Button onClick={handleRegister}>Register</Button>
        <p>
          Already a user? <LoginLink href="/login">Login</LoginLink>
        </p>
      </RegisterContainer>
    </Container>
  );
};

export default Register;
