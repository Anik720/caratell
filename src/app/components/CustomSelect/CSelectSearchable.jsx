/* eslint-disable unused-imports/no-unused-imports */
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import api from 'app/APIs/caratell-service/apiService';
import _ from 'lodash';

const CSelectSearchable = ({ defaultItem, placeholder, applySelect, getSearchableList }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    setSelectedOption(inputValue);
    return inputValue;
  };

  const loadOptions = async (inputValue, callback) => {
    if (!inputValue || inputValue.length < 3) {
      callback([]);
      return;
    }
    const options = await getSearchableList(inputValue);
    callback(options);
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        placeholder={placeholder || 'Search'}
        loadOptions={loadOptions}
        defaultValue={defaultItem}
        onInputChange={handleChange}
        onChange={(value) => {
          applySelect(value);
        }}
      />
    </div>
  );
};

export default CSelectSearchable;
