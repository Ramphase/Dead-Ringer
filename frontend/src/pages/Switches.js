import React from 'react';
import './Switches.css'
import Navbar from '../components/navbar'
import './Global.css'
const Switches = () => {
return (
	 <div class="bG">
		 <Navbar/>
            <h1>Switches</h1>
            <p class = "sDesc">Create and customize your dead man switches by using the option buttons below. You can quickly activate and deactivate them here too. </p>
            <h3 class = "noSwitches">You currently have no switches set up.</h3>
            <h3 class = "gStart">Get Started</h3>
            <button class="switch" type="button" onclick="../pages/switches">Create New Switch</button>
        </div> 
);
};

export default Switches;
