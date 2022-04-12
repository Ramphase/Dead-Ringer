import React, { Component, useState } from 'react';
import '../App.css'
import Popup from './popup';
import { useModal } from 'react-hooks-use-modal';

function Switches() {

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });

    return(
    <div class="bg">
      <Modal>
        {Popup(close)}
      </Modal>
      <h1>Dead Ringer | Switches</h1>
      <p>Create and customize your dead man switches by using the option buttons below.
        You can quickly activate and deactivate them here too. </p>
      <button onClick={open}>Create A Switch</button>
    </div>
  );
  
}
export default Switches;
