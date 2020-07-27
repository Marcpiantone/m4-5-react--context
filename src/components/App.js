import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import items from "../data";

import usePersistedState from "../hooks/usePersistedState.hook";

export const AppContext = createContext();

const App = () => {
  const [numCookies, setNumCookies] = usePersistedState("num-cookies", 1000);
  // const [numCookies, setNumCookies] = useState(1000);
  const [purchasedItems, setPurchasedItems] = usePersistedState("items", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  return (
    <AppContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        incrementCookies,
        calculateCookiesPerSecond,
      }}
    >
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
