import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CustomInput = (props) => {
  const { control, name, type, size, variant, className, cw, ...rest } = props;

  return (
    <div className={cw || ''}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={`w-full rounded-2 ${className || ''}`}
            autoFocus
            type={type || 'text'}
            size={size || 'small'}
            variant={variant || 'outlined'}
            required
            fullWidth
            {...rest}
          />
        )}
      />
    </div>
  );
};

CustomInput.propTypes = {
  control: PropTypes.object.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  InputProps: PropTypes.object,
  type: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  sx: PropTypes.object,
};

export default CustomInput;
