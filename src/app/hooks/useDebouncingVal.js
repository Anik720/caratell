/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const useDebouncingVal = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebouncingVal;

// usage:
// const MyApp = () => {
//   const [value, setValue] = useState('');
//   const debouncedValue = useCallBack(useDebouncingVal(value), [value]);
//   useEffect(() => {
//     console.log('Calling api with debounced value:', debouncedValue);
//   }, [debouncedValue]);

//   return (
//     <div>
//       <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
//     </div>
//   );
// };
