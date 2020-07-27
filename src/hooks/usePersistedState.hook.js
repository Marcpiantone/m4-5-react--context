import { useState, useEffect } from "react";

const usePersistedState = (key, value) => {
  //Fetch and turn to number / json
  const localValue = JSON.parse(localStorage.getItem(key));
  //Return if it exists
  const currentLocalValue = localValue ? localValue : value;

  //Declare new state :
  const [currentValue, setCurrentValue] = useState(currentLocalValue);

  //Store in localstorage this new value using state :
  useEffect(
    (key) => {
      localStorage.setItem(key, JSON.stringify(currentValue));
    },
    [currentValue]
  );

  //return for use
  return [currentValue, setCurrentValue];
};

export default usePersistedState;
