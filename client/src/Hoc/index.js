/*eslint-disable*/
import axios from 'axios';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {AUTH} from 'Configs/api';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const history = useHistory();

    if(document.cookie){
      if(!option){
        history.push('/main');
      }
    } else{
      if(option){
        history.push('/');
      }
    }
    /*useEffect(()=>{
      axios.get(AUTH, {
        headers: {
          Authorization: `Token ${document.cookie.split('=')[1]}`,
        },
      }).then((res)=>{
        console.log(res);
        if (!option) {
          history.push('/main');
        }
      }).catch(()=>{
        if (option) {
          history.push('/');
        }
      });
    }, [history]);*/

    return (
      <SpecificComponent />
    );
  }

  return AuthenticationCheck;
}
