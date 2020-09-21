import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import formSchema from './validation/formSchema';
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: '',
};

const initialFormErrors = {
  username: '',
  password: '',
};

const initialLogin = [];

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [savedFormInfo, setSavedFormInfo] = useState(initialLogin);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const [post, setPost] = useState([]);

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    // axios
    //   .post('http://hsmm-secretfamilyrecipe.herokuapp.com/login', formValues)
    //   .then((res) => {
    //     console.log(res.data);
    //     setPost(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const newLogin = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    setSavedFormInfo([...savedFormInfo, newLogin]);
    setFormValues(initialFormValues);
  };

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: '' });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <h2>Login</h2>
      <div className="errors">
        <div>{errors.username}</div>
        <div>{errors.password}</div>
      </div>
      <div className="form-inputs">
        <label>
          Username
          <input
            name="username"
            type="text"
            value={formValues.username}
            onChange={changeHandler}
            placeholder="username"
          ></input>
        </label>

        <br />

        <label>
          Password
          <input
            name="password"
            type="password"
            value={formValues.password}
            onChange={changeHandler}
            placeholder="password"
          ></input>
        </label>
      </div>
      <br />
      <button disabled={disabled}>Login</button>
    </form>
  );
};

export default Login;
