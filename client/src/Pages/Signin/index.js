import React from 'react';
import './style.scss';
import {AiFillLock} from 'react-icons/ai';
import {FcLock} from 'react-icons/fc';
import {FaQuestion} from 'react-icons/fa';
const Signin = () => {
  return (
    <div className="Signin">
      <div className="inner">
        <form>
          <h1><FcLock/></h1>
          <h2>Login</h2>
          <input type = "text" placeholder = "아이디"/>
          <input type = "password" placeholder = "비밀번호"/>
          <button><AiFillLock/>
          Sign in
          </button>
          <h3>
          Not registered<FaQuestion/ >
          </h3>
          <h4> Create account now</h4>
        </form>
      </div>
    </div>
  );
};

export default Signin;
