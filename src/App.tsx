import React, { useEffect, useState } from 'react';
import './App.css';
import Tree from './Components/Tree/Tree';

const FirstMock = require("./Utils/Server/FirstMock.json");
const SecondMock = require("./Utils/Server/SecondMock.json");

export default () => {
  const [url, updateURL] = useState<string>(FirstMock);
  let [seconds, setSeconds] = useState<number>(9);
  const [isActive, setIsActive] = useState(true);

  /**
   * Simulate URL change after 1 seconds.
   */
  useEffect(() => {
    setTimeout(() => {
      updateURL(SecondMock)
    }, 10000);

    /**
     * Starting count down.
     */
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);

  }, [isActive, seconds, url])

  return (
    <div className="App">
      <header className="App-header">
        {seconds > 0 ? <div>{`Simulation of URL being change in ${seconds}`}</div> : null}
        <Tree url={url} />
      </header>
    </div>
  );
}