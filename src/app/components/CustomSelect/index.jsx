import { Controller } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

const CustomSelect = (props) => {
  const { control, name, options, className, creatable, ...rest } = props;

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (creatable) {
            return (
              <CreatableSelect
                {...field}
                isSearchable
                name={name}
                options={options}
                className={`basic-multi-select ${className}`}
                classNamePrefix="select"
                {...rest}
              />
            );
          }

          return (
            <Select
              {...field}
              isSearchable
              name={name}
              options={options}
              className={`basic-multi-select ${className}`}
              classNamePrefix="select"
              {...rest}
            />
          );
        }}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  creatable: PropTypes.bool,
};

export default CustomSelect;
