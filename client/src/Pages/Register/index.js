import React from 'react';
import './style.scss';
import {FcCollaboration} from 'react-icons/fc';
const Register = () => {
  return (
    <div className="Register">
      <div className="inner">
        <div className="inner1">
          <h1>Query 계정 만들기</h1>
          <form>
            <input type ="text" placeholder = "이름을 입력 하세요"></input>
            <input type="text" placeholder = "아이디를 입력 하세요"></input>
            <input type="password" placeholder = "비밀번호를 입력 하세요"></input>
            <button>Sign up</button>
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
