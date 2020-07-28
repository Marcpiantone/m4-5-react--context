import React from "react";

import { GameContext } from "./GameContext";
import usePersistedState from "../hooks/usePersistedState.hook";
import items from "../data";

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies, timeDiff] = usePersistedState(
    "num-cookies",
    1000
  );

  const timeDiffInSecBiggerThan0 =
    Math.round(timeDiff / 1000) > 0 ? Math.round(timeDiff / 1000) : 1;

  if (Math.round(timeDiff / 1000) > 1)
    console.log("ELAPSED" + Math.round(timeDiff / 1000) + "s");

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

      return (acc + value * numOwned) * timeDiffInSecBiggerThan0;
    }, 0);
  };

  let cookiesPerSecond = calculateCookiesPerSecond(purchasedItems);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        incrementCookies,
        cookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
