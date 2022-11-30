import { CustomDialog } from 'app/components';
import { Typography, Button } from '@mui/material';
import clsx from 'clsx';

const ConfirmDialog = (props) => {
  const { title, subTitle, open, handleClose, handleDelete, variant, btnText, ...rest } = props;

  return (
    <>
      <CustomDialog open={open} handleClose={handleClose}>
        <div className="flex flex-col justify-center w-full items-center">
          <Typography className="mb-[10px] text-[20px] text-black font-[600]" variant="h4">
            {title}
          </Typography>
          <Typography className="mb-[20px] text-[14px] text-black font-[400]" variant="h6">
            {subTitle || 'This action can not be undone.'}
          </Typography>
          <div className="flex flex-row justify-between gap-[24px]">
            <Button
              className="rounded-none h-[40px] w-[120px] bg-dark-800 hover:bg-dark-600"
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className={clsx(
                'rounded-none h-[40px] w-[120px]',
                variant && variant === 'blue'
                  ? ` bg-primary-blue hover:bg-primary-blue-300`
                  : `bg-red hover:bg-red-300`
              )}
              variant="contained"
              onClick={() => {
                handleDelete();
                handleClose();
              }}
            >
              {btnText || `Delete`}
            </Button>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default ConfirmDialog;
