import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';



const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/Switches' activeStyle>
			Switches
		</NavLink>
		<NavLink to='/Messages' activeStyle>
			Messages
		</NavLink>
		<NavLink to='/Settings' activeStyle>
			Settings
		</NavLink>
		<NavBtnLink to='/'>Logout</NavBtnLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
