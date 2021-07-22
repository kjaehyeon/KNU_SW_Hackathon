/*eslint-disable*/
import { routes } from 'Configs/routes';
import Auth from 'Hoc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';

function RouteManager(){
  return(
    <Router>
      <Switch>
        {
          routes.map((route, i) => {
            const {path, component, exact} = route;
            let option = false;
            if(path === '/:file'){
              option = true;
            }
            return (
              <Route
                key={String(i)}
                path={path}
                component={Auth(component, option)}
                exact={exact}
              />
            );
          })
        }
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <RouteManager/>
  );
}
export default App;
