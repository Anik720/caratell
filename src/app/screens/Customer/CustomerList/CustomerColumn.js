import Chip from '@mui/material/Chip';
import { DateOnly } from 'app/utils';
import { Button } from '@mui/material';
import { Link as Rlink } from 'react-router-dom';
import _ from 'lodash';

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

const ProfilingChips = ({ value }) => {
  const profiling =
    value && value.length > 0
      ? value.filter((item) => item.title === 'self').map((item) => item.expert_kyc_status)[0]
      : 'not_specified';
  const colorMap = {
    requested: {
      color: '#FA8C16',
      borderColor: '#FFD591',
      backgroundColor: '#FFF7E6',
    },
    not_done: {
      color: '#1890FF',
      borderColor: '#91D5FF',
      backgroundColor: '#E6F7FF',
    },
    done: {
      color: '#52C41A',
      borderColor: '#B7EB8F',
      backgroundColor: '#F6FFED',
    },
    not_specified: {
      color: '#000000',
      borderColor: '#000000',
      backgroundColor: '#FFFFFF',
    },
    none: {
      color: '#000000',
      borderColor: '#000000',
      backgroundColor: '#FFFFFF',
    },
  };

  return (
    <div className="w-full flex flex-wrap">
      <Chip
        label={_.startCase(profiling)}
        color="primary"
        variant="outlined"
        size="small"
        sx={{
          borderRadius: '2px',
          borderColor: colorMap[profiling]?.borderColor || '#000000',
          color: colorMap[profiling]?.color || '#000000',
          backgroundColor: colorMap[profiling]?.backgroundColor || '#FFFFFF',
        }}
      />
    </div>
  );
};

const CustomerColumn = [
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
    accessor: 'userKyc',
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

export default CustomerColumn;
