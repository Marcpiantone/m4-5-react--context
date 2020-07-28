import React, { useEffect } from "react";

import { GameContext } from "./GameContext";
import usePersistedState from "../hooks/usePersistedState.hook";
import items from "../data";

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies, timeDiff] = usePersistedState(
    "num-cookies",
    1000
  );

  const timeDiffInSecBiggerThan0 =
    Math.floor(timeDiff / 1000) > 0 ? Math.floor(timeDiff / 1000) : 1;

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

  let cookiesPerSecond = calculateCookiesPerSecond(purchasedItems);

  useEffect(() => {
    if (timeDiffInSecBiggerThan0 > 1) {
      setNumCookies((c) => c + timeDiffInSecBiggerThan0 * cookiesPerSecond);
      console.log(
        `ELAPSED ${Math.floor(timeDiff / 1000)} sec - ${
          timeDiffInSecBiggerThan0 * cookiesPerSecond
        } cookies added while away`
      );
    }
  }, [timeDiffInSecBiggerThan0]);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        incrementCookies,
        cookiesPerSecond,
        timeDiffInSecBiggerThan0,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
