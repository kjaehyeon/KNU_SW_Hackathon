/*eslint-disable*/
import React from 'react';
import { useState } from 'react';

import {FiLink} from 'react-icons/fi';
import {FcFolder} from 'react-icons/fc';
import {BsChevronDown} from 'react-icons/bs';
import {AiFillFolderAdd} from 'react-icons/ai';
import {FaBook} from 'react-icons/fa';
import {CgNotes} from 'react-icons/cg';

import './style.scss';

function Nav() {
  const [state, setState] = useState([]);
  const onClick = (e) => {
    const id = Number(e.target.id);
    toggle(id);
  }

  const toggle = (id) => {
    const element = document.getElementById(`pair-${id}`);
    let new_state = state;
    
    if(!element){
      return;
    }

    let count = 0;
    
    element.childNodes.forEach((node)=>{
      if(node.nodeName === 'LI'){
        count++;
      }
    })

    if(!state[id]){
      element.style.height = `${count*30}px`;
      if(id >= 4 && id <= 7){
        const e = document.getElementById('pair-2');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      }
    } else{
      element.style.height = '0';
      if(id == 2){
        new_state = state.map((val, id)=>{
          if(id >= 4 && id<=7){
            if(val){
              toggle(id);
              return false;
            }
          }
          return val;
        });
        
      }
      else if(id >= 4 && id <= 7){
        const e = document.getElementById('pair-2');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - count*30}px`;
      }
    }

    new_state[id] = !new_state[id];
    setState(new_state);
  }
  return (
    <div className='nav'>
      <ul className='root'>
        <li className='wrapper'>
          <div clsas='root-items'>
            <FiLink className='icon'/>
            url
          </div>
          <div>
            <AiFillFolderAdd className='icon upload-folder'/>
            <BsChevronDown id='1' className='icon' onClick={onClick}/>
          </div>
        </li>
        <ul id='pair-1' className='items-wrapper'>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              공학수학
            </div>
            <div>
              <BsChevronDown className='icon'/>
            </div>
          </li>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              자료구조
            </div>
            <div>
              <BsChevronDown className='icon'/>
            </div>
          </li>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              선형대수
            </div>
            <div>
              <BsChevronDown className='icon'/>
            </div>
          </li>
        </ul>
      </ul>
      <ul className='root'>
        <li className='wrapper'>
          <div clsas='root-items'>
            <FaBook className='icon'/>
            강의자료
          </div>
          <div>
            <BsChevronDown id='2' className='icon' onClick={onClick}/>
          </div>
        </li>
        <ul id='pair-2' className='items-wrapper'>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              1학년
            </div>
            <div>
              <BsChevronDown id='4' className='icon' onClick={onClick}/>
            </div>
          </li>
          <ul id='pair-4' className='items-wrapper'>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              1학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
          </ul>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              2학년
            </div>
            <div>
              <BsChevronDown id='5' className='icon' onClick={onClick}/>
            </div>
          </li>
          <ul id='pair-5' className='items-wrapper'>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              1학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
          </ul>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              3학년
            </div>
            <div>
              <BsChevronDown id='6' className='icon' onClick={onClick}/>
            </div>
          </li>
          <ul id='pair-6' className='items-wrapper'>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              1학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
          </ul>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              4학년
            </div>
            <div>
              <BsChevronDown id='7' className='icon' onClick={onClick}/>
            </div>
          </li>
          <ul id='pair-7' className='items-wrapper'>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              1학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <BsChevronDown className='icon'/>
              </div>
            </li>
          </ul>
        </ul>
      </ul>
      <ul className='root'>
        <li className='wrapper'>
          <div clsas='root-items'>
            <CgNotes className='icon'/>
            오답노트
          </div>
          <div>
            <AiFillFolderAdd className='icon upload-folder'/>
            <BsChevronDown id='3' className='icon' onClick={onClick}/>
          </div>
        </li>
        <ul id='pair-3' className='items-wrapper'>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              공학수학
            </div>
            <div>
              <BsChevronDown className='icon'/>
            </div>
          </li>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              자료구조
            </div>
            <div>
              <BsChevronDown className='icon'/>
            </div>
          </li>
          <li className='wrapper'>
            <div className='items'>&nbsp;&nbsp;&nbsp;
              <FcFolder className='icon'/>
              선형대수
            </div>
            <div>
              <BsChevronDown className='icon'/>
            </div>
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default Nav;

