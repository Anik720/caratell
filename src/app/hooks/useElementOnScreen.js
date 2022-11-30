import { useState, useEffect, useMemo, useCallback } from 'react';

export const useElementOnScreen = (options, targetRef) => {
  const [isVisible, setIsVisible] = useState(false);

  const callBackFunction = useCallback(([entry]) => {
    setIsVisible(entry.isIntersecting);
  }, []);

  const optionsMemo = useMemo(() => options, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunction, optionsMemo);
    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, optionsMemo, callBackFunction]);

  return isVisible;
};
