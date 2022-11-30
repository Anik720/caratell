import { useState } from 'react';

const useDebouncingFunc = (func, delay) => {
  const [debouncedFunc, setDebouncedFunc] = useState(() => {
    const handler = setTimeout((...args) => {
      func(...args);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedFunc;
};

export default useDebouncingFunc;
