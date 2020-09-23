import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import * as yup from 'yup';
import formSchema from './validation/formSchema';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { setLoggedIn } from '../actions/index';
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

const Login = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [savedFormInfo, setSavedFormInfo] = useState(initialLogin);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  // const [post, setPost] = useState([]);
  const history = useHistory();

useEffect(() => {
  setLoggedIn()
}, [])

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    axios.post('http://hsmm-secretfamilyrecipe.herokuapp.com/login', `grant_type=password&username=${formValues.username}&password=${formValues.password}`, {
      headers: {
        // btoa is converting our client id/client secret into base64
        Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )
    .then(res => {
      props.setLoggedIn();
      localStorage.setItem('token', res.data.access_token)
      history.push('/userprofile');
    })
      .catch(err => {
      console.log(err)
    });
    
  
    // axios
    // .post('/login', `grant_type=password&username=${formValues.username}&password=${formValues.password}`)
    // .then(res => {
    //   console.log(res)
    //   props.setLoggedIn();
    //   localStorage.setItem('token', res.data.access_token)
    //   history.push('/userprofile');
    // })
    // .catch(err => {
    //   console.log(err)
    // });
  

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
          Username&nbsp;
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

export default connect(mapStateToProps, { setLoggedIn })(Login);
