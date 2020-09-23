import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import formSchema from './validation/formSchema';

import { useHistory } from 'react-router-dom';
import { setLoggedIn, setLoggedOut } from '../actions/index';
import { connect } from 'react-redux';
import axios from 'axios';

const initialFormValues = {
    username: '',
    email: '',
    password: '',
};

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
};

const initialSignup = [];

const Signup = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [savedFormInfo, setSavedFormInfo] = useState(initialSignup);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    axios
    .post('http://hsmm-secretfamilyrecipe.herokuapp.com/createnewuser', formValues)
    .then(res => {
      // console.log(res)
      // props.setLoggedIn();
      localStorage.setItem('token', res.data.access_token);
      history.push('/userprofile');
    })
    .catch(err => {
      console.log(err)
    })

    // axios.post('http://hsmm-secretfamilyrecipe.herokuapp.com/createnewuser', `grant_type=password&username=${formValues.username}&password=${formValues.password}`, {
    //   headers: {
    //     // btoa is converting our client id/client secret into base64
    //     Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })
    // .then(res => {
    //   props.setLoggedIn();
    //   localStorage.setItem('token', res.data.access_token)
    //   history.push('/userprofile');
    // })
    //   .catch(err => {
    //   console.log(err)
    // });

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
          Username&nbsp;
          <input
            name="username"
            type="text"
            value={formValues.username}
            onChange={(e) => changeHandler(e)}
            placeholder="username"
          />
        </label>

        <br />

        <label>
          Password&nbsp;
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
        Email&nbsp;
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, { setLoggedIn, setLoggedOut })(Signup);
