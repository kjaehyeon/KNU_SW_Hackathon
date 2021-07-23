import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';

import {BsDownload, BsQuestionDiamond} from 'react-icons/bs';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {GoLink} from 'react-icons/go';
import {GrDocumentPdf, GrNotes} from 'react-icons/gr';

import {DELETE_LECTURE_FILE, DELETE_URL_FILE} from 'Configs/api';

import './style.scss';

function Card(props) {
  const {
    type,
    title,
    summary,
    img,
    link,
    id,
    grade,
    semester,
    subject,
    file_data,
    makeModal,
  } = props;

  const goLink = () => {
    window.open(link);
  };

  const deleteFile = async () => {
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }
    if (type === 'url') {
      try {
        await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${document.cookie.split('=')[1]}`,
          },
          method: 'delete',
          url: `${DELETE_URL_FILE}${id}`,
        });

        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else if (type === 'lecture') {
      try {
        await axios({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${document.cookie.split('=')[1]}`,
          },
          method: 'delete',
          url: `${DELETE_LECTURE_FILE}${id}`,
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const download = () => {
    fileDownload(file_data, title);
  };

  return (
    <div className='card'>
      <div className='header'>
        {
          type === 'url' ?
            <GoLink
              size='28'
              className='icon'
              onClick={goLink}
            /> : type === 'lecture' ?
              <>
                <BsDownload
                  size='28'
                  title='download'
                  className='icon'
                  onClick={download}
                />
                <BsQuestionDiamond
                  size='28'
                  title='quiz'
                  className='icon'
                  onClick={()=>makeModal(title, grade, semester, subject)}
                />
              </> :
              <></>
        }
        <RiDeleteBin5Line
          size='28'
          title='delete'
          className='icon'
          onClick={deleteFile}
        />
      </div>
      <div className='content-wrapper'>
        {
          type === 'url' ?
            <img width='180px' height='180px' src={img} alt='img'/> :
            type === 'lecture' ?
              <GrDocumentPdf className='icon'/> :
              <GrNotes className='icon'/>
        }
        <div className='content'>
          <div className='title'>{title}</div>
          <div className='summary'>
            {summary}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

