import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../axiosWithAuth";



const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialLogin = {
    username:"",
    password:""
  }

  const history = useHistory();
  const[login, setLogin] = useState(initialLogin);

  const handleChange = e =>{
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', login)
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.payload);
      history.push('/protected')
    })
    .catch(err => console.log("Naw girl", err.response))
  }


  return (
    <div className="login">
      <h1 className="login-header">Welcome to the Bubble App!</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="User Name" onChange={handleChange} value={login.username} />
          <input type="text" name="password" placeholder="Password" onChange={handleChange} value={login.password}/>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
