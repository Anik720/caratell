import _ from 'lodash';
import { DateOnly } from 'app/utils';
import clsx from 'clsx';

const StatusChip = ({ value }) => {
  return <div className={clsx('text-center px-5', value)}>{_.startCase(value)}</div>;
};

const OrderColumns = [
  {
    Header: 'Order No',
    accessor: 'id',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Customer Name',
    accessor: 'billing_user_name',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Order Amount',
    accessor: 'net_total',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Collection Mode',
    accessor: 'collection_mode',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Order Date',
    accessor: 'order_date',
    Cell: DateOnly,
    isSortable: true,
  },
  {
    Header: 'Collection Date',
    accessor: 'created_at',
    Cell: DateOnly,
    isSortable: true,
  },
  {
    Header: 'Status',
    accessor: 'status',
    align: 'center',
    Cell: StatusChip,
    isSortable: true,
    width: '100px',
  },
];

export default OrderColumns;
