/*eslint-disable*/
import { routes } from 'Configs/routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';

function RouteManager(){
  return(
    <Router>
      <Switch>
        {
          routes.map((route, i) => {
            const {path, component, exact} = route;
            return (
              <Route
                key={String(i)}
                path={path}
                component={component}
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
