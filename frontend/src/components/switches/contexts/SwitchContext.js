import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const SwitchContext = createContext();

const SwitchContextProvider = (props) => {
  const [Switches, setSwitches] = useState([]);

  useEffect(() => {
    setSwitches(JSON.parse(localStorage.getItem("Switches")));
  }, []);

  useEffect(() => {
    localStorage.setItem("Switches", JSON.stringify(Switches));
  });

  const sortedSwitches = Switches.sort((a, b) => (a.name < b.name ? -1 : 1));

  const addSwitch = (id, name, contactId, timer, msgId) => {
    setSwitches([...Switches, { id, name, contactId, timer, msgId }]);
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
      value={{ sortedSwitches, addSwitch, deleteSwitch, updateSwitch }}
    >
      {props.children}
    </SwitchContext.Provider>
  );
};

export default SwitchContextProvider;
