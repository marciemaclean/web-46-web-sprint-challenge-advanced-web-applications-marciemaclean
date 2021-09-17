import axiosWithAuth from "../helpers/axiosWithAuth";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const initialValues = {username: 'username', password: 'password'};

const Login = () => {
  const { push } = useHistory();
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState();

  const handleChanges = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formValues.username !== "Lambda" || formValues.password !== "School") {
      setError("Enter valid username and password")
    } 

    axiosWithAuth()
    .post('/api/login', formValues)
        .then((res) =>{
          console.log("Axios Login Post ", res)
          localStorage.setItem('token', res.data.payload)
          push('/bubblepage')
        })
        .catch((err) => {
          console.log({err})
        })
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          data-testid="username"
          name="username"
          value={formValues.username}
          onChange={handleChanges}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          data-testid="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
  );
};

export default Login;