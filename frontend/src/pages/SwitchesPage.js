import React from 'react';
import Navbar from '../components/navbar/Navbar'
import SwitchContextProvider from '../components/switches/contexts/SwitchContext';
import Switches from '../components/switches/SwitchesComponent';


const SwitchesPage = () => {
return (
    <SwitchContextProvider>
        <div>
        <Navbar/>
        <Switches/>
    </div> 
    </SwitchContextProvider>
    );
};

export default SwitchesPage;
