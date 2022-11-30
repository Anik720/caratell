import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

const variantMap = (variant) => {
  if (!variant) return 'info';
  if (variant === 's') return 'success';
  if (variant === 'e') return 'error';
  if (variant === 'i') return 'info';
  if (variant === 'w') return 'warning';
  return 'info';
};

const useSnackbar = () => {
  const dispatch = useDispatch();

  /**
   * Show a message in the snackbar
   * @param {string} message
   * @param {string} variant - 's' for success, 'e' for error, 'i' for info, 'w' for warning. Default is 'info'
   */
  return (message, variant) => {
    dispatch(
      showMessage({
        message,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: variantMap(variant),
      })
    );
  };
};

export default useSnackbar;
