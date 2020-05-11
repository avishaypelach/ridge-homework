import React, { useEffect, useState } from 'react';
import './App.css';
import Tree from './Components/Tree/Tree';

const FirstMock = require("./Utils/Server/FirstMock.json");
const SecondMock = require("./Utils/Server/SecondMock.json");

const countInfo = (count: number) => `Simulation of URL change in ${count}`

export default () => {
  const [url, updateURL] = useState<string>(FirstMock);
  const [count, updateCount] = useState<number>(9);

  /**
   * Simulate URL change after 10 seconds.
   */
  useEffect(() => {
    /**
     * Handle cunt down.
     */
    let interval = null;

    if (count > 0) {
      interval = setInterval(() => {
        updateCount(count => count - 1);
      }, 1000);
    } else {
      updateURL(SecondMock)

      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count]);



  return (
    <div className="App">
      <header className="App-header">
        {count ? <div>{countInfo(count)}</div> : null}
        <Tree url={url} />
      </header>
    </div>
  );
}