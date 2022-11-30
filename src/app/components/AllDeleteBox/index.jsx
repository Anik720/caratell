import { useState } from 'react';
import { Button } from '@mui/material';
import ConfirmDialog from '../ConfirmDialog';

const AllDeleteBox = ({ selected, title, subTitle, btnText, confimAction }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="my-[20px] mr-[20px]">
      <Button
        className="rounded-none h-[40px] ml-[3px] bg-red hover:bg-red-700"
        variant="contained"
        onClick={() => {
          setModalOpen(true);
        }}
        disabled={selected && selected.length === 0}
      >
        Delete Selected
      </Button>
      <ConfirmDialog
        handleDelete={confimAction}
        open={modalOpen}
        variant="red"
        btnText={btnText || 'Confirm'}
        handleClose={() => setModalOpen(false)}
        title={title || 'Delete Selected'}
        subTitle={subTitle || 'Are you sure you want to delete selected items?'}
      />
    </div>
  );
};

export default AllDeleteBox;
