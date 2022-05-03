import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const ContactContext = createContext();
var bp = require("../../Path.js");
var storage = require("../../../tokenStorage.js");
var userToken = storage.retrieveToken();
var userID = JSON.parse(localStorage.getItem("user_data"));

const ContactContextProvider = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    var obj = { userId: userID.id, jwtToken: userToken };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("displayContacts"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    axios(config).then(function (response) {
      var res = response.data;
      console.log(res);
      if (res.error) {
        console.log("Failure");
      } else {
        console.log("Success");
        if (res.results.length > 0) {
          console.log(res.results);
          setContacts(res.results);
        } else {
          console.log("No contacts to display");
        }
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  });

  const sortedContacts = contacts.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addContact = (contactId, firstName, lastName, email, phoneNumber) => {
    setContacts([
      ...contacts,
      { contactId, firstName, lastName, email, phoneNumber },
    ]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.contactId !== contactId));
  };

  const updateContact = (contactId, updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.contactId === contactId ? updatedContact : contact
      )
    );
  };

  const getContact = (contactId) => {
    return contacts.find((contact) => contact.contactId === contactId);
  };

  return (
    <ContactContext.Provider
      value={{
        sortedContacts,
        addContact,
        deleteContact,
        updateContact,
        getContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
