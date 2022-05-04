import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useApi } from "../../hooks/useApi";

export const SignIn = ({ setUserInfo }) => {
  const api = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = ({ target }) => {
    setEmail(target.value.toLowerCase());
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const onSignIn = (signedInUser) => {
    const { token, data } = signedInUser;
    localStorage.setItem("token", JSON.stringify(token));
    setUserInfo(data);
  };

  const signUp = () => {
    api
      .signUp({ email, password })
      .then((createdUser) => {
        return api.signIn({ email, password });
      })
      .then(onSignIn);
  };

  const signIn = () => {
    api.signIn({ email, password }).then(onSignIn);
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
      <div style={{width:'400px'}}>
      <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
      <TextField 
        type="email"
        id="outlined-basic"
        variant="outlined"
        placeholder="Введите e-mail"
        name='email'
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        type="password"
        id="outlined-basic"
        variant="outlined"
        placeholder="Введите пароль"
        name='password'
        value={password}
        onChange={handlePasswordChange}
        required
      />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', margin:'15px'}}>
      <button style={{width:'45%'}} onClick={signUp}>Регистрация</button>
      <button style={{width:'45%'}} onClick={signIn}>Вход</button></div>
      </div>
    </div>
  );
};
