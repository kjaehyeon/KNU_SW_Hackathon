import React from 'react';
import axios from 'axios';
import useInput from 'utils/useInput';
import {REGISTER} from 'Configs/api';
import {FcCollaboration} from 'react-icons/fc';
import {useHistory} from 'react-router-dom';

import './style.scss';
const Register = () => {
  const history = useHistory();
  const [input, handleInput] = useInput({
    id: '',
    email: '',
    password: '',
  });

  const {
    id,
    email,
    password,
  } = input;

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        url: REGISTER,
        data: {
          username: id,
          email,
          password,
        },
      });

      history.push('/');
    } catch (err) {
      alert('회원가입 실패');
    }
  };

  return (
    <div className="Register">
      <div className="inner">
        <div className="inner1">
          <h1>Query 계정 만들기</h1>
          <form onSubmit={register}>
            <input
              type ="email"
              name='email'
              placeholder = "이메일을 입력 하세요"
              value={email}
              onChange={handleInput}
            />
            <input
              type="text"
              name='id'
              placeholder = "아이디를 입력 하세요"
              value={id}
              onChange={handleInput}
            />
            <input
              type="password"
              name='password'
              placeholder = "비밀번호를 입력 하세요"
              value={password}
              onChange={handleInput}
            />
            <button type='submit'>Sign up</button>
          </form>
        </div>
        <div className="inner2">
          <FcCollaboration/>
        </div>
      </div>
    </div>
  );
};
export default Register;
