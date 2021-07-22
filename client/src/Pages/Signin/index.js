/*eslint-disable*/
import React from 'react';
import {AiFillLock} from 'react-icons/ai';
import {FcLock} from 'react-icons/fc';
import {FaQuestion} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';
import useInput from 'utils/useInput';
import axios from 'axios';
import {SIGNIN} from 'Configs/api';
import {useCookies} from 'react-cookie';

import './style.scss';

const Signin = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['token']);

  const [input, handleInput] = useInput({
    id: '',
    password: '',
  });

  const {
    id,
    password,
  } = input;

  const signin = async (e) => {
    e.preventDefault();

    try{
    const response = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: SIGNIN,
      data: {
        username: id,
        password
      },
    });
    const {data: {token}} = response;
    const {data: {user: {username}}} = response;
    if (token) {
      const expires = new Date();
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

      setCookie('token', token, {path: '/', expires});

      if (username) {
        localStorage.setItem('username', username);
      }
    }

    history.push('/main');
    } catch(err){
      alert('로그인 실패')
    }
  };

  const goRegisterPage = () => {
    history.push('/register');
  };

  return (
    <div className="Signin">
      <div className="inner">
        <form>
          <h1><FcLock/></h1>
          <h2>Login</h2>
          <input
            type = "text"
            value = {id}
            name = 'id'
            placeholder = "아이디"
            onChange={handleInput}
          />
          <input
            type = "password"
            value = {password}
            name = 'password'
            placeholder = "비밀번호"
            onChange={handleInput}
          />
          <button onClick={signin}><AiFillLock/>
          Sign in
          </button>
          <h3>
          Not registered<FaQuestion/ >
          </h3>
          <h4 onClick={goRegisterPage}> Create account now </h4>
        </form>
      </div>
    </div>
  );
};

export default Signin;
