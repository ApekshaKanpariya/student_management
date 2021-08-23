import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import Context from '../../store/context';

const MainNavigation = () => {

  const ctx = useContext(Context);

  const isLoggedIn = ctx.isLoggedIn;

  const logoutHandler = () =>{
    ctx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Student Management</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <Link to='/form'>Student Form</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/Table'>Student Detail</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler} >Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
