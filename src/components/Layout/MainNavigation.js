import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

    // const logoutHandler = () => {
    //     localStorage.removeItem('token');
    // }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Tool Share</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
