import { useState, useEffect } from "react";

const usePersistedState = (key, value) => {
  //Fetch and turn to number / json
  const localValue = JSON.parse(localStorage.getItem(key));

  //Return localeValue if it exists
  const currentLocalValue = localValue ? localValue.currentValue : value;

  //Retrieve timestamp for use if exists
  const timeDiff = localValue ? new Date().getTime() - localValue.timestamp : 0;

  //Declare new state :
  const [currentValue, setCurrentValue] = useState(currentLocalValue);

  //Add a timestamp for the localstorage
  const objectStored = {
    currentValue: currentValue,
    timestamp: new Date().getTime(),
  };

  //Store in localstorage this new value using state :
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(objectStored));
  }, [currentValue]);

  //return for use
  return [currentValue, setCurrentValue, timeDiff];
};

export default usePersistedState;
