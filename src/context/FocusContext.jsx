import { createContext, useRef, useCallback } from 'react';

export const FocusContext = createContext({
  setFocus: () => {}
});

export const FocusProvider = ({ children }) => {
  const inputRef = useRef(null);

  const setFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <FocusContext.Provider value={{ inputRef, setFocus }}>
      {children}
    </FocusContext.Provider>
  );
};
