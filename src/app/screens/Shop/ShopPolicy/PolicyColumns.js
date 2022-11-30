import { Switch } from '@mui/material';
import React from 'react';

const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center">
      <button
        type="button"
        className="w-full h-full bg-transparent text-blue-500 font-medium py-2 px-4"
      >
        Edit
      </button>

      <button
        type="button"
        className="w-full h-full bg-transparent text-red-500 font-medium py-2 px-4"
      >
        Delete
      </button>
    </div>
  );
};

const ApplyToAllButton = (props) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      color="blue"
    />
  );
};

const PolicyColumns = [
  {
    Header: 'Policy Title',
    accessor: 'title',
    isSortable: true,
    width: '70%',
  },
  {
    Header: 'Apply To All',
    accessor: 'action',
    Cell: ApplyToAllButton,
    isSortable: false,
    align: 'center',
  },
  {
    Header: 'Action',
    accessor: 'action2',
    Cell: ActionButton,
    isSortable: false,
    align: 'center',
  },
];

export default PolicyColumns;
