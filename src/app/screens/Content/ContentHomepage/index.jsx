/* eslint-disable unused-imports/no-unused-imports */
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchBox } from 'app/components';

import HomeItemsTable from './HomeItemsTable';

function ContentHomepage() {
  const [searchText, setsearchText] = useState('');

  const applySearch = (value) => {
    setsearchText(value);
  };

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Homepage
              <Tooltip title="Homepage" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row">
            <div>
              <Button
                component={Link}
                to="/content/homepage/create"
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
              >
                Create banner
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full bg-light">
          {/* <SearchBox searchText={searchText} applySearch={applySearch} /> */}
          <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
            <HomeItemsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHomepage;
