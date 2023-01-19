import { useEffect, useState } from "react";

//react - localStorage persistence
export const usePersistedString = (localStorageKey, defaultValue) => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || defaultValue
  );

  const removeValue = () => localStorage.removeItem(localStorageKey);

  useEffect(() => {
    if (value) {
      localStorage.setItem(localStorageKey, value);
    }
  }, [value]);

  // Expose the value and the updater function.
  return [value, setValue, removeValue];
};
