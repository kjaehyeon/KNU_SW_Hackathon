/*eslint-disable*/
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import Nav from 'Components/Nav';
import Card from 'Components/Card';
import { GET_FOLDER_LIST, GET_LECTURE_FOLDER_LIST, GET_URL_FILE_LIST, GET_URL_FOLDER_LIST } from 'Configs/api';

import {BsQuestionCircleFill} from 'react-icons/bs';
import {FaRegUser} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

import './style.scss';

function Home() {
  const [update, setUpdate] = useState(true);
  const [url_folder_list, setUrlFolderList] = useState([]);
  const [lecture_folder_list, setLectureFolderList] = useState([]);
  const [file_list, setFileList] = useState([]);

  const path = decodeURI(location.pathname.slice(1));
  const type = path.split('-')[0];
  const user_id = localStorage.getItem('username');

  useEffect (()=>{
    if(path !== 'main'){
      if(type === 'url'){
        const name = path.split('-')[1];
        axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${document.cookie.split('=')[1]}`
          },
          method: 'get',
          url: GET_URL_FILE_LIST,
          params: {
            name
          }
        }).then((res)=>{
          setFileList(res.data);
        }).catch((err)=>{
          console.log(err);
        });
      } else{
        const [grade, semester, subject] = path.split('-').slice(1);
        console.log(grade, semester, subject);
      }
      
    }
    axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${document.cookie.split('=')[1]}`
      },
      method: 'get',
      url: GET_URL_FOLDER_LIST,
    }).then((res)=>{
      setUrlFolderList(res.data);
    }).catch((err)=>{
      console.log(err);
    });

    axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${document.cookie.split('=')[1]}`
      },
      method: 'get',
      url: GET_LECTURE_FOLDER_LIST,
    }).then((res)=>{
      setLectureFolderList(res.data);
    }).catch((err)=>{
      console.log(err);
    });
  }, []);

  return (
    <div className='home__container'>
      <div className='aside'>
        <div className='wrapper'>
          <div className='logo'>
            <BsQuestionCircleFill className='icon'/>
            Query
          </div>
          <Nav
            url_folder_list={url_folder_list}
            setUrlFolderList={setUrlFolderList}
            lecture_folder_list={lecture_folder_list}
            setLectureFolderList={setLectureFolderList}
            setUpdate={setUpdate}
          />
        </div>
      </div>
      <div className='body'>
        <div className='user'>
          <FaRegUser className='icon'/>
          <span className='user-id'>{user_id}</span>님
          <div className='logout'>
            <FiLogOut className='icon'/>
            로그아웃
          </div>
        </div>
        <div className='main'>
          {
            file_list.map((file, i)=>{
              const {
                title,
                body,
                image_url,
                link
              } = file;
              return (
              <Card
                key={i}
                type={type}
                title={title}
                summary={body}
                img={image_url}
                link={link}
              />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
