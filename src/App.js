import React, { useState } from 'react';
import Entry from './Entry';
import './App.css';

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

  const onKeyUp = ({ target, keyCode }) => {
    if (keyCode === 13) {
      const { name, value } = target;
      if (name === 'url') {
        setupWebSocket(value);
      } else if (name === 'command') {
        window.ws.send(
          JSON.stringify({
            id: 1,
            method: value,
          })
        );
        target.value = '';
      }
    }
  };

  return (
    <div className="app">
      <span className="state">{wsState}</span>
      <input name="url" placeholder="Websocket URL" onKeyUp={onKeyUp} />
      <input name="command" placeholder="Custom command" onKeyUp={onKeyUp} />
      {dump.map((c, i) => (
        <Entry key={i} content={c} />
      ))}
    </div>
  );
};

export default App;
