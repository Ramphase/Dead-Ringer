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
		<NavLink to='/TriggerSettings' activeStyle>
			Trigger Settings
		</NavLink>
		<NavLink to='/Messages' activeStyle>
			Messages
		</NavLink>
		<NavLink to='/NotificationSettings' activeStyle>
			Notification Settings
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
