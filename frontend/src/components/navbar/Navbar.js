import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import icon from '../images/icon.png'



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
		<NavLink to='/Contacts' activeStyle>
			Contacts
		</NavLink>
		<NavBtnLink to='/'>Logout</NavBtnLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
