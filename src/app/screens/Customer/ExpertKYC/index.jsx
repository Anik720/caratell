import { Typography, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from 'app/components/SearchBox';

import {
  getExpertKycCustomersSF,
  setExpertsSearchTextSF,
} from 'app/store/appstore/customerStore/customersSlice';

import KycTable from './KycTable';

function CustomerList() {
  const dispatch = useDispatch();
  const expertSearchText = useSelector(({ appstore }) => appstore.customers.expertSearchText);
  const [selected, setSelected] = useState([]);

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Expert Requested KYC
              <Tooltip title="Blog" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-light">
            <SearchBox
              placeholder="Search by Customer name"
              searchText={expertSearchText}
              applySearch={(value) => {
                dispatch(setExpertsSearchTextSF(value));
                dispatch(getExpertKycCustomersSF({ page: 0, limit: 10 }));
              }}
            />
            <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
              <KycTable selected={selected} setSelected={setSelected} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
