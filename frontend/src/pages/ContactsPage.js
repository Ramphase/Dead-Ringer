import React from 'react';
import Navbar from '../components/navbar/Navbar'
import ContactsList from '../components/contacts/ContactsList';
import ContactContextProvider from '../components/contacts/context/ContactContext';


const ContactsPage = () => {
return (
	<ContactContextProvider>
	<div>
		<Navbar/>
		<ContactsList/>
	</div>
	</ContactContextProvider>
);
};

export default ContactsPage;
