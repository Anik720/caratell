import { DateOnly, truncateString } from 'app/utils';
import { Button } from '@mui/material';
import { Link as Rlink } from 'react-router-dom';

const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <Button
        size="small"
        component={Rlink}
        to={`/content/blog/edit/${props.row.original.id}`}
        variant="text"
        className="bg-transparent text-blue-500 font-medium py-2 px-4"
      >
        View
      </Button>
      <Button
        size="small"
        className="bg-transparent text-red-500 font-medium py-2 px-4"
        onClick={() => props.deleteBlog(props.row.original.id)}
      >
        Delete
      </Button>
    </div>
  );
};

const RenderTitle = ({ value }) => {
  return <div className="font-[600]">{truncateString(value, 30)}</div>;
};

const BlogColumns = [
  {
    Header: 'Blog Title',
    accessor: 'title',
    isSortable: true,
    Cell: RenderTitle,
    width: '255px',
  },
  {
    Header: 'Category',
    accessor: 'category',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Published Date',
    accessor: 'created_at',
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

export default BlogColumns;
