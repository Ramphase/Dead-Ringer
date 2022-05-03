import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const SwitchContext = createContext();

var bp = require("../../Path.js");
var storage = require("../../../tokenStorage.js");
var userToken = storage.retrieveToken();
var userID = JSON.parse(localStorage.getItem("user_data"));

const SwitchContextProvider = (props) => {
  const [Switches, setSwitches] = useState([]);

  useEffect(() => {
    var obj = { userId: userID.id, jwtToken: userToken };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("displayTriggers"),
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
          setSwitches(
            res.results.map((swtch) => ({
              id: swtch.triggerId,
              name: swtch.triggerName,
              msgId: swtch.message,
              contactId: swtch.contactId[0],
              timer: swtch.time,
            }))
          );
          console.log(res.results);
        } else {
          console.log("No contacts to display");
        }
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("Switches", JSON.stringify(Switches));
  });

  const sortedSwitches = Switches.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addSwitch = (id, name, contactId, msgId, timer) => {
    setSwitches([...Switches, { id, name, contactId, msgId, timer }]);
  };

  const deleteSwitch = (id) => {
    setSwitches(Switches.filter((Switch) => Switch.id !== id));
  };

  const updateSwitch = (id, updatedSwitch) => {
    setSwitches(
      Switches.map((Switch) => (Switch.id === id ? updatedSwitch : Switch))
    );
  };

  return (
    <SwitchContext.Provider
      value={{
        sortedSwitches,
        addSwitch,
        deleteSwitch,
        updateSwitch,
      }}
    >
      {props.children}
    </SwitchContext.Provider>
  );
};

export default SwitchContextProvider;
