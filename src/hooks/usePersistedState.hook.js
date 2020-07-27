import React, { useState } from "react";

const usePersistedState = (key, value) => {
  //Declare new state :
  const [currentValue, setCurrentValue] = useState(value);
  //Store in localstorage this new value using state :
  localStorage.setItem(key, JSON.stringify(currentValue));
  // Fetch and turn to number / json
  const currentLocalValue = JSON.parse(localStorage.getItem(key));
  //return for use
  return [currentLocalValue, setCurrentValue];
};

export default usePersistedState;
