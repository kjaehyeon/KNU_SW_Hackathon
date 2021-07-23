import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {FcReadingEbook} from 'react-icons/fc';
import {FcMakeDecision} from 'react-icons/fc';
import {TiDelete} from 'react-icons/ti';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {MAKE_WRONG} from 'Configs/api';

import './style.scss';
function Modal(props) {
  const {
    visible,
    setVisible,
    quiz_list,
  } = props;

  const subject = decodeURI(window.location.pathname.split('-')[3]);
  const [test_state, setTestState] = useState(true);
  const [inputs, setInputs] = useState([]);
  const handleChange = (e) => {
    const new_state = [...inputs];
    new_state[Number(e.target.name)] = e.target.value;
    setInputs(new_state);
  };
  const clickSubmit = () => {
    quiz_list.forEach((value, index) => {
      value === inputs[index] ? value.state = 'o' :
        value.state = 'x';
    });
    setTestState(false);
  };
  const clickMake = async () => {
    const wrong_list = quiz_list.filter((q)=>q.state === 'x');
    console.log(wrong_list);
    try {
      const response = await axios({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${document.cookie.split('=')[1]}`,
        },
        method: 'post',
        url: MAKE_WRONG,
        data: wrong_list,
      });
      clickClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const clickClose = () => {
    setVisible(false);
    setTestState(true);
  };

  /* const [State, SetState] = useState([]);
  const HandleChange = (e) => {
    const a = [...State];
    a[Number(e.target.name)] = e.get.value;
    SetState(a);
  };
  const ClickSubmit = () => {
    quizlist.map((value, index) =>
      value === State[index] ? quizlist.state = 'o' :
        quizlist.state = 'x');
  };
  const questionlist = quizlist.map((question) =>
    question.state === 'o' ? <li className = "o">
      {'Q: '}{question.q}<br/>{' A: '}{question.a}</li>:
      <li className = "x">{'Q: '}{question.q}<br/>{' A: '}{question.a}</li>);
  const testlist = quizlist.map((q) => {
    return (
      <div key={q.id}>{'Q: '}{q.question}<br/><input type = "text"
        name = {q.id} OnChange={HandleChange}/></div>
    );
  });*/
  return (
    visible &&
    <div className="modal_overlay">
      <div className="modal">
        <div className = "modal_title">
          {subject}
        </div>
        <div className = "modal_content">
          <div className = "inner1">
            {
              test_state ?
                quiz_list.map((q)=>{
                  return (
                    <div key={q.id}>{'Q: '}{q.question}<br/>
                      <input name={q.id} onChange={handleChange}/>
                    </div>
                  );
                }) :
                quiz_list.map((question, i) =>
                  question.state === 'o' ?
                    <div key={i} className = "o">
                      {'Q: '}{question.question}<br/>{' A: '}{question.answer}
                    </div> :
                    <div key={i} className = "x">
                      {'Q: '}{question.question}<br/>{' A: '}{question.answer}
                    </div>)
            }
          </div>
          <div className = "inner2">
            <FcReadingEbook/>
          </div>
        </div>
        <div className="modal_button">
          {
            !test_state &&
            <button id="makebutton"
              onClick={clickMake}
            >
              <FcMakeDecision/>
                오답노트 생성
            </button>
          }
          {
            test_state &&
            <button id="submitbutton"
              onClick={clickSubmit}
            >
              <AiOutlineArrowUp/>
              제출
            </button>
          }
          {
            <button id="closebutton"
              onClick={clickClose}
            >
              <TiDelete/>
              닫기
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.defaultProps = {
  subject: '공학수학 CHAP1',
  clickMake: null,
  ClickSubmit: null,
  ClickClose: null,
  SubmitText: '제출하기',
  MakeText: '오답노트 생성',
  CloseText: '닫기',
  ViewPage: false,
  TestPage: true,
  WrongPage: false,
};
