import Home from 'Pages/Home';
import Register from 'Pages/Register';
import Signin from 'Pages/Signin';
import _404 from 'Pages/_404';

const SIGNIN = '/signin';
const REGISTER = '/register';
const HOME = '/';

export const routes = [
  {component: Home, path: HOME, exact: true},
  {component: Signin, path: SIGNIN, exact: true},
  {component: Register, path: REGISTER, exact: true},
  {component: _404},
];
