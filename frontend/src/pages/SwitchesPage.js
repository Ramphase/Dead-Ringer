import React from "react";
import Navbar from "../components/navbar/Navbar";
import SwitchContextProvider from "../components/switches/contexts/SwitchContext";
import Switches from "../components/switches/SwitchesComponent";
import ContactContextProvider from "../components/contacts/context/ContactContext";
import MessageContextProvider from "../components/messages/context/MessageContext";

const SwitchesPage = () => {
  return (
    <ContactContextProvider>
      <MessageContextProvider>
        <SwitchContextProvider>
          <div>
            <Navbar />
            <Switches />
          </div>
        </SwitchContextProvider>
      </MessageContextProvider>
    </ContactContextProvider>
  );
};

export default SwitchesPage;
