import { useEffect, useState } from 'react';
import { Checkbox, Popover, Typography } from '@mui/material';

import pageData from './pageData';

function CustomerFilter(props) {
  const { filterPoper, filterPoperClose } = props;

  const [productTypeChecked, setProductTypeChecked] = useState([]);

  useEffect(() => {
    setProductTypeChecked(pageData.customerFilterTypeIdsOnly);
  }, []);

  const handleProductTypeChecked = (event, productType) => {
    const currentIndex = productTypeChecked.indexOf(productType.id);
    const newChecked = [...productTypeChecked];

    if (currentIndex === -1) {
      newChecked.push(productType.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setProductTypeChecked(newChecked);
  };

  return (
    <Popover
      open={Boolean(filterPoper)}
      anchorEl={filterPoper}
      onClose={filterPoperClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      classes={{
        paper: 'py-8',
      }}
      className="ml-[-140px]"
    >
      <div className="flex w-[175px] flex-col p-[15px]">
        <Typography className="text-[14px] font-bold">KYC Status</Typography>
        <div className="flex flex-col flex-wrap flex-grow-[1]">
          {pageData.customerFilterTypes.map((option, index) => (
            <div key={index} className="flex flex-row">
              <div>
                <Checkbox
                  checked={!!productTypeChecked.includes(option.id)}
                  onChange={(event) => {
                    handleProductTypeChecked(event, option);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div>
                <Typography className="text-[12px] mt-[12px]">{option.label}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  );
}

export default CustomerFilter;
