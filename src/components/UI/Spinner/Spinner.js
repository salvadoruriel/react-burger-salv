import React from 'react';

//courtesy of: https://projects.lukehaas.me/css-loaders/
//with white background (rgb(255,255,255)) and FG: rgb(5,150,121)
import classes from './Spinner.module.css';

const spinner = () => (
  <div className={classes.Loader}>Loading...</div>
);

export default spinner;