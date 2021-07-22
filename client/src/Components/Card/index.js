/*eslint-disable*/
import React from 'react';

import {BsDownload, BsQuestionDiamond} from 'react-icons/bs';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {GoLink} from 'react-icons/go';

import './style.scss';

function Card(props) {
  const {
    type,
    title,
    summary,
    img
  } = props;

  return (
    <div className='card'>
      <div className='header'>
        {
          type === 'url' ? <GoLink size='28' className='icon' className='icon'/> :
          <>
            <BsDownload size='28' title='download' className='icon'/>
            <BsQuestionDiamond size='28' title='quiz' className='icon'/>
          </>
        }
        <RiDeleteBin5Line size='28' title='delete' className='icon'/>
      </div>
      <div className='content-wrapper'>
        <img width='150px' height='180px' src={img}/>
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

