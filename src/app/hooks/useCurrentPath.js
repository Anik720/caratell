import { useLocation } from 'react-router-dom';

/**
 * @function A function that returns the current path of the page.
 * @param {Number} index index of url part to get, if not specified, returns whole url
 * @returns {String} url part
 */
const useCurrentPath = (index) => {
  const location = useLocation();
  const pathName = location.pathname;
  if (!pathName) return '';
  if (!index) return location.pathname;
  const urlParts = pathName.split('/');
  return urlParts[index];
};

export default useCurrentPath;
