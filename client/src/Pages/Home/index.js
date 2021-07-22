/*eslint-disable*/
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import Nav from 'Components/Nav';
import Card from 'Components/Card';
import Loader from "react-loader-spinner";
import {GET_LECTURE_FILE_LIST, GET_LECTURE_FOLDER_LIST, GET_URL_FILE_LIST, GET_URL_FOLDER_LIST } from 'Configs/api';

import {FaRegUser} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

import src from 'assets/logo.png';
import query from 'assets/query.png';
import './style.scss';

function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [url_folder_list, setUrlFolderList] = useState([]);
  const [lecture_folder_list, setLectureFolderList] = useState([]);
  const [file_list, setFileList] = useState([]);

  const path = decodeURI(location.pathname.slice(1));
  const type = path.split('-')[0];
  const user_id = localStorage.getItem('username'); 

  useEffect (async ()=>{
    setLoading(true);
    if(type === 'url'){
      const name = path.split('-')[1];
      try{
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${document.cookie.split('=')[1]}`
        },
        method: 'get',
        url: GET_URL_FILE_LIST,
        params: {
          name
        }
      })
      setFileList(response.data);
      }catch(err){
        console.log(err);
      }
    } else if(type === 'lecture'){
      try {
      const [grade, semester, subject] = path.split('-').slice(1);
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${document.cookie.split('=')[1]}`
        },
        method: 'get',
        url: GET_LECTURE_FILE_LIST,
        params: {
          grade: `${grade}학년`,
          semester: `${semester}학기`,
          subject,
        }
      });
      setFileList(response.data);
      } catch(err){
        console.log(err);
      }
    }
    try{
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${document.cookie.split('=')[1]}`
        },
        method: 'get',
        url: GET_URL_FOLDER_LIST,
      });
      setUrlFolderList(response.data);
    } catch(err){
      console.log(err);
    }

    try{
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${document.cookie.split('=')[1]}`
        },
        method: 'get',
        url: GET_LECTURE_FOLDER_LIST,
      });
        setLectureFolderList(response.data);    
    } catch(err){
      console.log(err)
    }
    setLoading(false);
  }, [path]);

  const goHome = () => {
    history.push('/main');
  }

  return (
    <div className='home__container'>
      <div className='aside'>
        <div className='wrapper'>
          <div
            className='logo'
            onClick={goHome}
          >
            <img width='100%' height='30%' src={src}/>
          </div>
          <Nav
            url_folder_list={url_folder_list}
            setUrlFolderList={setUrlFolderList}
            lecture_folder_list={lecture_folder_list}
            setLectureFolderList={setLectureFolderList}
            setLoading={setLoading}
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
            loading ? <div className='loader'><Loader type='Bars' color='#607d8b'/></div> :  
            file_list.length > 0 ?
            file_list.map((file, i)=>{
              if(type === 'url'){
                const {
                  title,
                  body,
                  image_url,
                  link,
                  id
                } = file;
                return (
                <Card
                  key={i}
                  type={type}
                  title={title}
                  summary={body}
                  img={image_url}
                  link={link}
                  id={id}
                />
                );
              } else if(type === 'lecture') {
                const {
                  name,
                  id,
                  grade,
                  semester,
                  subject,
                  file_data
                } = file
                
                return (
                  <Card
                    key={i}
                    title={name}
                    grade={grade}
                    type={type}
                    semester={semester}
                    subject={subject}
                    file_data={file_data}
                    id={id}
                  />
                )
              }
            }) : 
            <div className='not'>
              <img width='300px' height='300px' src={query}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
