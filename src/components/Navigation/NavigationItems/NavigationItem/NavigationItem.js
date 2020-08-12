import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      /* href={props.link} */
      to={props.link}
      exact={props.exact}/**To avoid prefix clashes like / */
      /** on NavLink active is automatically detected, unlike <a>*/
      /* className={props.active ? classes.active : null} */
      activeClassName={classes.active}
    >{props.children}</NavLink>
  </li>
);

export default navigationItem;