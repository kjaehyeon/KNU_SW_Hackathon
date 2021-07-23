import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const history = useHistory();

    if (document.cookie) {
      if (!option) {
        history.push('/main');
      }
    } else {
      if (option) {
        history.push('/');
      }
    }

    return (
      <SpecificComponent />
    );
  }

  return AuthenticationCheck;
}
