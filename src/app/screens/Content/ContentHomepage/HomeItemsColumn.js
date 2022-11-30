/* eslint-disable no-nested-ternary */
import { CIMG } from 'app/components';
import { Button, Typography } from '@mui/material';
import { Link as Rlink } from 'react-router-dom';
import clsx from 'clsx';
import { truncateString } from 'app/utils';

const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <Button
        size="small"
        component={Rlink}
        to={`/content/homepage/edit/${props.value}`}
        variant="text"
        className="bg-transparent text-blue-500 font-medium py-2 px-4"
      >
        View
      </Button>
      <Button
        size="small"
        className="bg-transparent text-red-500 font-medium py-2 px-4"
        onClick={() => props.deleteBanner(props.value)}
      >
        Delete
      </Button>
    </div>
  );
};

const BannerImage = (props) => {
  const alignment = props.row?.text_alignment || 'left';
  const subtitle = props.row?.sub_title || '';
  const description = props.row?.description || '';
  const heading = props.row?.heading || '';
  const image = props.row?.image || '';
  return (
    <div className="box-border flex flex-col relative h-[100px]">
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <CIMG src={image || 'assets/images/etc/coverPreview.jpg'} w="100%" h="100%" />
      </div>
      <div
        className={clsx(
          'absolute flex z-20 flex-col h-full w-full justify-center p-[16px] bg-black bg-opacity-70',
          alignment == 'left' ? 'items-start' : alignment == 'center' ? 'items-center' : 'items-end'
        )}
      >
        <Typography className="font-[300] text-white text-[8px]">
          {subtitle || 'Subtitle'}
        </Typography>
        <Typography className="font-[800] text-light text-[12px]">
          {heading || 'Heading'}
        </Typography>
        <Typography className="font-[500] text-light text-[8px]">
          {truncateString(description, 28) || 'Description'}
        </Typography>
      </div>
    </div>
  );
};

const ProductColumns = [
  {
    Header: 'Image Section',
    accessor: 'image',
    Cell: BannerImage,
    isSortable: false,
  },
  {
    Header: 'Collection',
    accessor: 'heading',
    type: String,
    isSortable: true,
    width: '350px',
  },
  {
    Header: 'Call to Action',
    accessor: 'call_to_Action',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ActionButton,
    isSortable: false,
    align: 'center',
  },
];

export default ProductColumns;
