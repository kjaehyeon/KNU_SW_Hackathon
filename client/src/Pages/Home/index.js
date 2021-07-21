/*eslint-disable*/
import React from 'react';
import { useState } from 'react';

import Nav from 'Components/Nav';
import Card from 'Components/Card';

import {BsQuestionCircleFill} from 'react-icons/bs';
import {FaRegUser} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

import './style.scss';

function Home() {
  const [file_list, setFileList] = useState([]);

  return (
    <div className='home__container'>
      <div className='aside'>
        <div className='wrapper'>
          <div className='logo'>
            <BsQuestionCircleFill className='icon'/>
            Query
          </div>
          <Nav/>
        </div>
      </div>
      <div className='body'>
        <div className='user'>
          <FaRegUser className='icon'/>
          사용자
          <div className='logout'>
            <FiLogOut className='icon'/>
            로그아웃
          </div>
        </div>
        <div className='main'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  );
}

export default Home;
