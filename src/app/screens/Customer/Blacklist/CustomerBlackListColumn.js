import Chip from '@mui/material/Chip';
import { DateOnly } from 'app/utils';
import { Button } from '@mui/material';
import { Link as Rlink } from 'react-router-dom';

const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center">
      <Button
        component={Rlink}
        to={`/customer/profile/${props.row.original.id}/view`}
        variant="text"
        className="w-full h-full bg-transparent text-blue-500 font-medium py-2 px-4"
      >
        View
      </Button>
    </div>
  );
};

const ProfilingChips = (props) => {
  const profiling = props.value || 'Not Specified';

  const colorMap = {
    Requested: {
      color: '#FA8C16',
      borderColor: '#FFD591',
      backgroundColor: '#FFF7E6',
    },
    'Not Done': {
      color: '#1890FF',
      borderColor: '#91D5FF',
      backgroundColor: '#E6F7FF',
    },
    Done: {
      color: '#52C41A',
      borderColor: '#B7EB8F',
      backgroundColor: '#F6FFED',
    },
    'Not Specified': {
      color: '#000000',
      borderColor: '#000000',
      backgroundColor: '#FFFFFF',
    },
  };

  return (
    <div className="w-full flex flex-wrap">
      <Chip
        label={profiling}
        color="primary"
        variant="outlined"
        size="small"
        sx={{
          borderRadius: '2px',
          borderColor: colorMap[profiling].borderColor,
          color: colorMap[profiling].color,
          backgroundColor: colorMap[profiling].backgroundColor,
        }}
      />
    </div>
  );
};

const CustomerBlackListColumn = [
  {
    Header: 'Customer Name',
    accessor: 'first_name',
    type: String,
    isSortable: true,
    width: '255px',
  },
  {
    Header: 'Mobile Number',
    accessor: 'phone_number',
    type: String,
    isSortable: false,
  },
  {
    Header: 'Email',
    accessor: 'email',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Date of Birth',
    accessor: 'birthDay',
    Cell: DateOnly,
  },
  {
    Header: 'Profiling',
    accessor: 'customerType',
    Cell: ProfilingChips,
    isSortable: true,
    align: 'left',
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: ActionButton,
    isSortable: false,
    align: 'center',
  },
];

export default CustomerBlackListColumn;
