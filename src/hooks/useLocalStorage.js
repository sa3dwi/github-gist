import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // get existingItems from localStorage
      let existingItems = localStorage.getItem(key) ? localStorage.getItem(key) : [];
          existingItems = existingItems.length > 0 ? JSON.parse(existingItems) : [];

      // Add the data to localStorage Array
      existingItems.push(valueToStore);
      // Remove duplicated items 
      const items = [...new Set(existingItems)].filter((el) => el !== "");
      // Save back to localStorage and return
      setStoredValue(items);
      window.localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.error(err);
    }
  };

  const clearStore = () => {
    window.localStorage.clear();
    setStoredValue('');
  };

  return [storedValue, setValue, clearStore];
};

export default useLocalStorage;