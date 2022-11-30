import { forwardRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Slide } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, mb: '10px' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '0px',
  },
}));

const CustomDialog = (props) => {
  return (
    <StyledDialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        {props.title || ''}
      </BootstrapDialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </StyledDialog>
  );
};

export default CustomDialog;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
