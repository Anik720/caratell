import { DateOnly } from 'app/utils';
import { Button } from '@mui/material';
import { Link as Rlink } from 'react-router-dom';

const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center">
      <Button
        component={Rlink}
        to={`/settings/admin/edit/${props.row.original.id}`}
        variant="text"
        className="w-full h-full bg-transparent text-primary-blue font-medium py-2 px-4"
      >
        Edit
      </Button>
      <Button
        variant="text"
        className="w-full h-full bg-transparent text-red font-medium py-2 px-4"
        onClick={() => props.deleteAdmins(props.row.original.id)}
      >
        Delete
      </Button>
    </div>
  );
};

const RolesColumn = (props) => {
  const { value } = props;
  const roles = value.map((role) => role).join(', ');
  return <div>{roles || 'N/A'}</div>;
};

const AdminColumns = [
  {
    Header: 'Admin Name',
    accessor: 'adminName',
    isSortable: true,
    width: '255px',
  },
  {
    Header: 'Company Role',
    accessor: 'roles',
    Cell: RolesColumn,
    isSortable: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Last Login',
    accessor: 'updatedAt',
    isSortable: true,
    Cell: DateOnly,
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: ActionButton,
    isSortable: false,
    align: 'center',
  },
];

export default AdminColumns;
