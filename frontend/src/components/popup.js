import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';


const Popup = (close) => {

    const state = {
        sName: '',
        cID: '',
        msg: '',
        timer: ''
    }

   /*const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);*/

    const handleSubmitClick = () => {
        const switchDisplay = {
            sName: this.state.sName,
            cID: this.state.cID,
            msg: this.state.msg,
            timer: this.state.timer
        };
        // incoming: userId, name, message, contact
        axios.post('/addTrigger', {name: this.sName, contact: this.cID, message: this.msg})
        .then(function (response){console.log(response);})
    };

/*currentMessages.map(message => (
                <tr key={message.id}>
                  <Message message={message} />
                </tr>
                ))  
*/


  return (
    <div class="popup">
        <form action={handleSubmitClick}>
            <label for="sName">Switch Name:</label>
            <input type="text" id="sName" name="sName" placeholder="Switch Name" />
            <label for="Contacts">Contacts:</label>
            <select placeholder="Contacts">
                <option id="contacts" name="cID" value="Contacts">Contacts</option>
            </select>
              <div class="popcon">
                <div>
                    <label for="msg">Message: </label>
                    <select placeholder="Message">
                        <option id="msg" name="msg" value="Message">Message</option>
                    </select>
                </div>
                <div>
                    <label for="timer">Timer: </label>
                    <select placeholder="Timer">
                        <option id="timer" name="timer" value="Timer">Timer</option>
                    </select>
                </div>
            </div>
            <br/>
            <input type="submit" value="SAVE"/>
        </form>
        <button onClick={close}>CLOSE</button>
    </div>
  );
};

export default Popup;