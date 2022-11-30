import { Typography, Tooltip, Button, Paper, Input } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

import { useState } from 'react';

import PolicyTable from './PolicyTable';

function ShopPolicy() {
  const [searchTextInput, setsearchTextInput] = useState('');

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Policy
              <Tooltip title="Homepage" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row">
            <div>
              <Button
                component={Link}
                to="/shop/policy/create"
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
              >
                Create Policy
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full bg-light">
          <div className="flex flex-row items-start justify-start ml-[10px] my-[20px]">
            <Paper className="flex items-center  w-[300px] h-[40px] max-w-512 rounded-none px-8 shadow-0 border-1  border-grey-200">
              <Input
                placeholder="Search"
                className="flex flex-1 mx-8"
                disableUnderline
                value={searchTextInput}
                inputProps={{
                  'aria-label': 'Search',
                }}
                // onChange={(ev) => dispatch(setOrdersSearchText(ev))}
                onChange={(ev) => setsearchTextInput(ev.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // console.log(`Pressed keyCode ${e.key} ${searchTextInput}`);
                    // Do code here
                    e.preventDefault();
                    // dispatch(setOrdersSearchText(searchTextInput))
                  }
                }}
              />
            </Paper>
            <Button
              className="rounded-none h-[40px] ml-[3px] bg-primary-blue hover:bg-primary-blue-dark"
              variant="contained"
              onClick={() => {
                // return dispatch(setOrdersSearchText(searchTextInput))
              }}
            >
              Search
            </Button>
          </div>
          <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
            <PolicyTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPolicy;
