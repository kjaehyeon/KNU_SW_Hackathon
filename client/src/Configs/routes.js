import Home from 'Pages/Home';
import Register from 'Pages/Register';
import Signin from 'Pages/Signin';
import _404 from 'Pages/_404';

const SIGNIN = '/';
const REGISTER = '/register';
const HOME = '/:file';

export const routes = [
  {component: Signin, path: SIGNIN, exact: true},
  {component: Register, path: REGISTER, exact: true},
  {component: Home, path: HOME, exact: true},
  {component: _404},
];
