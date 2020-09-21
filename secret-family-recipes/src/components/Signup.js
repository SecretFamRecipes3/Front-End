import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import formSchema from './validation/formSchema';

const initialFormValues = {
  username: '',
  password: '',
  email: '',
};

const initialFormErrors = {
  username: '',
  password: '',
  email: '',
};

const initialSignup = [];

const Signup = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [savedFormInfo, setSavedFormInfo] = useState(initialSignup);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    const newSignup = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
    };
    setSavedFormInfo(...savedFormInfo, newSignup);
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
      <h2>Sign Up</h2>
      <div className="errors">
        <div>{errors.username}</div>
        <div>{errors.password}</div>
        <div>{errors.email}</div>
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

      <label>
        Email:&nbsp;
        <input
          name="email"
          type="email"
          value={formValues.email}
          onChange={changeHandler}
          placeholder="email"
        ></input>
      </label>
      <br />
      <br />

      <button disabled={disabled}>Login</button>
    </form>
  );
};

export default Signup;
