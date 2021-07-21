/*eslint-disable*/
import React from 'react';
import { useState } from 'react';
import { Map, List } from 'immutable';
import { useHistory } from 'react-router-dom';

import {FiLink} from 'react-icons/fi';
import {FcFolder} from 'react-icons/fc';
import {BsChevronDown} from 'react-icons/bs';
import {AiFillFolderAdd} from 'react-icons/ai';
import {FaBook} from 'react-icons/fa';
import {CgNotes} from 'react-icons/cg';
import {RiDeleteBin5Line, RiFileUploadLine} from 'react-icons/ri';

import './style.scss';

function Nav() {
  const [folder_state, setFolderState] = useState([]);
  const [url_folder_list, setUrlFolderList] = useState(List([]));
  const [lecture_folder_list, setLectureFolderList] = useState(List([]));
  const [wrong_folder_list, setWrongFolderList] = useState(List([]));
  const history = useHistory();

  const ADD = 1;
  const DELETE = 2;
  const URL = 1;
  const LECTURE_MATERIAL = 2;
  const WRONG_NOTE = 3;
  const onClick = (e) => {
    const id = Number(e.target.id);
    toggle(id);
  }

  const toggle = (id) => {
    const element = document.getElementById(`pair-${id}`);
    let new_state = folder_state;
    
    if(!element){
      return;
    }

    let count = 0;
    
    element.childNodes.forEach((node)=>{
      if(node.nodeName === 'LI'){
        count++;
      }
    })

    if(!folder_state[id]){
      element.style.height = `${count*30}px`;
      if(id >= 4){
        const e = document.getElementById('pair-2');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      }
      if(id >= 8 && id <=9){
        const e = document.getElementById('pair-4');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      } 
      else if(id >= 10 && id <=11){
        const e = document.getElementById('pair-5');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      } 
      else if(id >= 12 && id <=13){
        const e = document.getElementById('pair-6');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      } 
      else if(id >= 14 && id <=15){
        const e = document.getElementById('pair-7');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      } 
    } else{
      element.style.height = '0';
      if(id === 2){
        new_state = folder_state.map((val, id)=>{
          if(id >= 4 && id <= 7){
            if(val){
              toggle(id);
              return false;
            }
          }
          return val;
        });
      }
      if(id === 4){
        new_state = folder_state.map((val, id)=>{
          if(id >= 8 && id <= 9){
            if(val){
              toggle(id);
              return false;
            }
          }
          return val;
        });
      }
      if(id === 5){
        new_state = folder_state.map((val, id)=>{
          if(id >= 10 && id <= 11){
            if(val){
              toggle(id);
              return false;
            }
          }
          return val;
        });
      }
      if(id === 6){
        new_state = folder_state.map((val, id)=>{
          if(id >= 12 && id <= 13){
            if(val){
              toggle(id);
              return false;
            }
          }
          return val;
        });
      }
      if(id === 7){
        new_state = folder_state.map((val, id)=>{
          if(id >= 14 && id <= 15){
            if(val){
              toggle(id);
              return false;
            }
          }
          return val;
        });
      }
      if(id >= 4){
        const e = document.getElementById('pair-2');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - count*30}px`;
      }
      if(id >= 8 && id <= 9){
        const e = document.getElementById('pair-4');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - count*30}px`;
      }
      if(id >= 10 && id <= 11){
        const e = document.getElementById('pair-5');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - count*30}px`;
      }
      if(id >= 12 && id <= 13){
        const e = document.getElementById('pair-6');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - count*30}px`;
      }
      if(id >= 14 && id <= 15){
        const e = document.getElementById('pair-7');
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - count*30}px`;
      }
    }

    new_state[id] = !new_state[id];
    setFolderState(new_state);
  }

  const refresh = (id, type) => {
    if(!folder_state[id]){
      setFolderState(prev => {
        prev[id] = true;
        return prev;
      })
    }

    const element = document.getElementById(`pair-${id}`);
    if(!element){
      return;
    }
    
    let count = 0;
    
    element.childNodes.forEach((node)=>{
      if(node.nodeName === 'LI'){
        count++;
      }
    });

    if(type === ADD){
      element.style.height = `${(count+1)*30}px`;
    } else{
      element.style.height = `${(count-1)*30}px`;
    }

    return !folder_state[id] ? count + 1 : 1;
  }

  const addFolder = (folder_type, id, path, parentId=[]) => {
    const name = prompt('폴더명을 입력하세요');
    if(!name){
      return;
    }
    switch(folder_type){
      case URL:
        setUrlFolderList(prev => prev.push(Map({
          name,
          file_list: List([]),
          path
        })));
        break;
      case LECTURE_MATERIAL:
        setLectureFolderList(prev => prev.push(Map({
          name,
          file_list: List([]),
          path
        })));
        break;
      case WRONG_NOTE:
        break;
    }

    const count = refresh(id, ADD);
    if(folder_type === LECTURE_MATERIAL) {
      parentId.forEach((id)=>{
        const e = document.getElementById(`pair-${id}`);
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height + count*30}px`;
      })
    }
  }

  const deleteFolder = (folder_type, id, index, parentId=[]) => {
    if(!confirm('삭제하시겠습니까?')){
      return;
    }
    switch(folder_type){
      case URL:
        setUrlFolderList(prev => prev.delete(index));
        break;
      case LECTURE_MATERIAL:
        setLectureFolderList(prev => prev.delete(index));
        break;
      case WRONG_NOTE:
        break;
    }

    refresh(id, DELETE);
    if(folder_type === LECTURE_MATERIAL){
      parentId.forEach((id)=>{
        const e = document.getElementById(`pair-${id}`);
        const height = Number(e.style.height.replace('px', ''));
        e.style.height = `${height - 30}px`;
      })
    }
  }

  const showFiles = (path) => {
    history.push(path);
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
            <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(URL, 1, 'url')}/>
            <BsChevronDown id={`${URL}`} className='icon' onClick={onClick}/>
          </div>
        </li>
        <ul id={`pair-${URL}`} className='items-wrapper'>
          {
            url_folder_list.map((folder, i)=>{
              return (
                <li key={i} className='wrapper'>
                  <div className='items file' onClick={() => {showFiles(`url-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;
                    <FcFolder className='icon'/>
                    {
                      folder.get('name')
                    }
                  </div>
                  <div>
                    <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(URL, 1, i)}/>
                    <RiFileUploadLine className='icon'/>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </ul>
      <ul className='root'>
        <li className='wrapper'>
          <div clsas='root-items'>
            <FaBook className='icon'/>
            강의자료
          </div>
          <div>
            <BsChevronDown id={`${LECTURE_MATERIAL}`} className='icon' onClick={onClick}/>
          </div>
        </li>
        <ul id={`pair-${LECTURE_MATERIAL}`} className='items-wrapper'>
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
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 8, '1/1', [4, 2])}/>
                <BsChevronDown id='8' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-8' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '1/1'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-1-1-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 8, i, [4, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 9, '1/2', [4, 2])}/>
                <BsChevronDown id='9' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-9' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '1/2'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-1-2-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 9, i, [4, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
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
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 10, '2/1', [5, 2])}/>
                <BsChevronDown id='10' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-10' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '2/1'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-2-1-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 10, i, [5, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 11, '2/2', [5, 2])}/>
                <BsChevronDown id='11' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-11' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '2/2'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-2-2-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 11, i, [5, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
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
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 12, '3/1', [6, 2])}/>
                <BsChevronDown id='12' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-12' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '3/1'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-3-1-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 12, i, [6, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 13, '3/2', [6, 2])}/>
                <BsChevronDown id='13' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-13' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '3/2'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-3-2-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 13, i, [6, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
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
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 14, '4/1', [7, 2])}/>
                <BsChevronDown id='14' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-14' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '4/1'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-4-1-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 14, i, [7, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
            <li className='wrapper'>
              <div className='items'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FcFolder className='icon'/>
              2학기
              </div>
              <div>
                <AiFillFolderAdd className='icon upload-folder' onClick={()=>addFolder(LECTURE_MATERIAL, 15, '4/2', [7, 2])}/>
                <BsChevronDown id='15' className='icon' onClick={onClick}/>
              </div>
            </li>
            <ul id='pair-15' className='items-wrapper'>
                {
                  lecture_folder_list.map((folder, i)=>{
                    if(folder.get('path') === '4/2'){
                      return (
                        <li key={i} className='wrapper'>
                          <div className='items file' onClick={() => {showFiles(`lecture-4-2-${folder.get('name')}`)}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FcFolder className='icon'/>
                            {
                              folder.get('name')
                            }
                          </div>
                          <div>
                            <RiDeleteBin5Line className='icon' onClick={()=>deleteFolder(LECTURE_MATERIAL, 15, i, [7, 2])}/>
                            <RiFileUploadLine className='icon'/>
                          </div>
                        </li>
                      );
                    }
                  })
                }
            </ul>
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
            <BsChevronDown id={`${WRONG_NOTE}`} className='icon' onClick={onClick}/>
          </div>
        </li>
        <ul id={`pair-${WRONG_NOTE}`} className='items-wrapper'>
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

