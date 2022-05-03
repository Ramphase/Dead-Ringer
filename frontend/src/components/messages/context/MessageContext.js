import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const MessageContext = createContext();

const MessageContextProvider = (props) => {
  var bp = require("../../Path.js");
  var storage = require("../../../tokenStorage.js");
  var userToken = storage.retrieveToken();
  var userID = JSON.parse(localStorage.getItem("user_data"));

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var obj = { userId: userID.id, jwtToken: userToken };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("displayMessages"),
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
          setMessages(
            res.results.map((msg) => ({
              id: msg.MessageId,
              messageName: msg.MessageName,
              switchMessage: msg.Text,
            }))
          );
        } else {
          console.log("No contacts to display");
        }
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  });

  const sortedMessages = messages.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addMessage = (id, messageName, switchMessage) => {
    setMessages([...messages, { id, messageName, switchMessage }]);
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const updateMessage = (id, updatedMessage) => {
    setMessages(
      messages.map((message) => (message.id === id ? updatedMessage : message))
    );
  };

  return (
    <MessageContext.Provider
      value={{ sortedMessages, addMessage, deleteMessage, updateMessage }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
