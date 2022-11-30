import { Button, Paper, Input } from '@mui/material';
import { useState, useEffect } from 'react';

const SearchBox = ({ placeholder, searchText, applySearch }) => {
  const [searchTextInput, setsearchTextInput] = useState(searchText);

  useEffect(() => {
    setsearchTextInput(searchText);
  }, [searchText]);

  return (
    <div className="flex flex-row items-start justify-start ml-[10px] my-[20px]">
      <Paper className="flex items-center  w-[300px] h-[40px] max-w-512 rounded-none px-8 shadow-0 border-1  border-grey-200">
        <Input
          placeholder={placeholder || 'Search'}
          className="flex flex-1 mx-8"
          disableUnderline
          value={searchTextInput}
          inputProps={{
            'aria-label': 'Search',
          }}
          onChange={(ev) => setsearchTextInput(ev.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              applySearch(searchTextInput);
            }
          }}
        />
      </Paper>
      <Button
        className="rounded-none h-[40px] ml-[3px] bg-primary-blue hover:bg-primary-blue-dark"
        variant="contained"
        onClick={() => {
          applySearch(searchTextInput);
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
