import React, { useState } from 'react';
import Entry from './Entry';
import './App.css';

const ENTER_KEY_CODE = 13;

const App = () => {
  const [dump, setDump] = useState([]);
  const [wsState, setWSState] = useState('ENTER URL');

  const setupWebSocket = url => {
    window.ws = new WebSocket(url);
    window.wsM = [];

    window.ws.onopen = () => setWSState('OPEN');
    window.ws.onerror = () => setWSState('ERROR');
    window.ws.onclose = () => setWSState('CLOSE');
    window.ws.onmessage = message => {
      window.wsM = [JSON.parse(message.data), ...window.wsM];
      console.log(message.data);
      setDump(window.wsM);
    };
  };

  const onKeyUp = event => {
    const { target, keyCode, shiftKey } = event;
    const { name, value } = target;
    if (keyCode === ENTER_KEY_CODE) {
      if (name === 'url') {
        setupWebSocket(value);
      } else if (name === 'message' && !shiftKey) {
        event.preventDefault();
        if (window.ws) window.ws.send(value);
      }
    }
  };

  const onChange = ({ target }) => {
    const { value } = target;
    let data = null;
    try {
      data = JSON.parse(value);
    } catch (e) {}

    target.value = data ? JSON.stringify(data, null, 2) : value;
  };

  const onKeyDown = event => {
    const { keyCode, shiftKey } = event;
    // Only allow newline, when shift is pressed.
    if (keyCode === ENTER_KEY_CODE && !shiftKey) {
      event.preventDefault();
    }
  };

  const defaultValue = JSON.stringify(
    JSON.parse('{"id":1,"method":""}'),
    null,
    2
  );

  return (
    <div className="app">
      <span className="state">{wsState}</span>
      <input name="url" placeholder="Websocket URL" onKeyUp={onKeyUp} />
      <textarea
        name="message"
        placeholder="Custom message"
        onKeyDown={onKeyDown}
        onChange={onChange}
        onKeyUp={onKeyUp}
        defaultValue={defaultValue}
      />
      {dump.map((c, i) => (
        <Entry key={i} content={c} />
      ))}
    </div>
  );
};

export default App;
