import { Popover, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MoreActions = (props) => {
  const { moreActionsPoper, moreActionsPoperClose } = props;

  return (
    <Popover
      open={Boolean(moreActionsPoper)}
      anchorEl={moreActionsPoper}
      onClose={moreActionsPoperClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      classes={{
        paper: 'py-8',
      }}
      className="ml-[-20px] min-w-[350px] w-full"
    >
      <div className="flex w-full flex-col px-[15px]">
        <div className="flex w-full my-[10px]">
          <Button
            component={Link}
            to="/orders"
            className="rounded-none py-[5px] text-center w-full bg-black-300 hover:bg-primary-blue"
            variant="contained"
          >
            Preview Invoice
          </Button>
        </div>
        <div className="flex w-full my-[10px]">
          <Button
            component={Link}
            to="/orders"
            className="rounded-none py-[5px] text-center w-full bg-black-300 hover:bg-primary-blue"
            variant="contained"
          >
            Download Invoice
          </Button>
        </div>
        <div className="flex w-full my-[10px]">
          <Button
            component={Link}
            to="/orders"
            className="rounded-none py-[5px] text-center w-full bg-black-300 hover:bg-primary-blue"
            variant="contained"
          >
            Send Invoice
          </Button>
        </div>
      </div>
    </Popover>
  );
};

export default MoreActions;
