import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		{props.isAuthenticated
			? <NavigationItem link="/orders">Orders</NavigationItem>
			: null}
		{!props.isAuthenticated
			? <NavigationItem link="/auth">Authenticate</NavigationItem>
			: <NavigationItem link="/logout">Logout</NavigationItem>}
		{/* alternatively NavigationIte, for logout could be a component,
			that on click logouts (the best/easiest in my opinion) */}
	</ul>
);

export default navigationItems;