// https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp

import React from 'react';
import { NavLink } from 'react-router-dom';

import './navbar.css';

export default function NavBarDropdown({
	title,
	linksArray = [ { title: 'test1', ref: '#' }, { title: 'test2', ref: '#' }, { title: 'test3', ref: '#' } ]
}) {
	return (
		<div className="dropdown">
			<button className="dropbtn">
				{title}
				{/* <i className="fa fa-caret-down" /> */}
			</button>
			<div className="dropdown-content">
				{linksArray.map((link, i) => {
					return (
						<NavLink key={i} exact to={link.ref}>
							{link.title}
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}
