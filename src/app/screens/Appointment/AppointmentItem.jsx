/* eslint-disable camelcase */
import _ from 'lodash';
import { Typography, Button, Chip, TextField } from '@mui/material';
import { DayAndFullDate, convertDateToString } from 'app/utils';
import { CustomAccordionV2, ConfirmDialog, CustomDialog } from 'app/components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAppointmentSF } from 'app/store/appstore/appointmentStore/appointmentSlice';
import { useSnackbar } from 'app/hooks';
import api from 'app/APIs/caratell-service/apiService';
import Reschedule from './Reschedule';

const SingleProduct = ({ product }) => {
  return (
    <div className="flex w-full flex-row border-1  border-light-600 p-[10px] gap-[27px] justify-start items-center">
      <Typography className="text-[14px] font-[600] text-black">{product.id}</Typography>
      <div className="w-[90px] h-[90px]">
        <img src={product.image || 'https://picsum.photos/200/200'} alt="product" />
      </div>
      <div className="flex flex-col ml-[10px]">
        <Typography className="text-[12px] font-[600] text-black">{product.sku}</Typography>
        <Typography
          variant="h6"
          color="inherit"
          className="text-[14px] font-[600] text-black mb-[8px]"
        >
          {product.name}
        </Typography>
        <Typography className="text-[14px] font-[400] text-black">{product.description}</Typography>
      </div>
    </div>
  );
};

const AddNote = ({ appointment }) => {
  const [noteDetails, setNoteDetails] = useState(appointment.note);

  const showSnackbar = useSnackbar();

  const hanldeUpdateNote = async () => {
    try {
      showSnackbar('Updating note...');
      await api.updateAppointmentNote({
        appointmentId: appointment.id,
        note: noteDetails,
      });
      showSnackbar('Note updated successfully.', 's');
    } catch (error) {
      console.log(error);
      showSnackbar('Error updating note', 'e');
    }
  };
  return (
    <div className="flex w-full flex-row border-1 border-light-600 px-[10px] py-[24px] gap-[27px] justify-start items-center">
      <div className="w-[80%]">
        <TextField
          placeholder="Add Note"
          value={noteDetails}
          onChange={(e) => setNoteDetails(e.target.value)}
          className="w-full rounded-2"
          type="text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      </div>
      <Button
        className="rounded-none mb-[12px] bg-primary-blue hover:bg-primary-blue"
        variant="contained"
        aria-label="update-note"
        onClick={hanldeUpdateNote}
      >
        Update Note
      </Button>
    </div>
  );
};

const AppointmentTitle = ({ appointment, chipColorMap }) => {
  const { start_time, end_time, type } = appointment.slotDetails;
  const { user } = appointment;
  const appointmentType = _.startCase(type);
  return (
    <div className="w-full flex flex-row p-[20px] gap-[10px] items-center justify-start bg-white">
      <div className="flex flex-col w-2/12">
        <Typography className="text-[14px] font-[400] text-dark-800">
          {start_time} - {end_time}
        </Typography>
        <div className="mt-[8px]">
          <Chip
            label={appointmentType || '-'}
            color="primary"
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '2px',
              borderColor: chipColorMap[appointmentType]?.borderColor || '#000',
              color: chipColorMap[appointmentType]?.color || '#000',
              backgroundColor: chipColorMap[appointmentType]?.backgroundColor || '#e8e8e8',
            }}
          />
        </div>
      </div>
      <div className="flex flex-col w-8/12">
        <Typography className="text-[14px] font-[600] text-black-300">
          {user?.first_name || '-'} {user?.last_name || '-'}
        </Typography>
        <Typography className="text-[14px] font-[400] text-black-300">
          {appointment?.product?.length || 0} Item
        </Typography>
      </div>
      <div className="flex flex-col justify-end w-2/12">
        <Typography
          variant="h6"
          color="inherit"
          className="text-right text-[14px] font-[400] text-primary-blue"
        >
          Product Enquiry
        </Typography>
      </div>
    </div>
  );
};

const AppointmentChild = ({ appointment }) => {
  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();
  const { user, product } = appointment;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rsOpen, setRsOpen] = useState(false);

  const handleDelete = () => {
    const { id } = appointment;
    if (!id) {
      showSnackbar('Appointment id not found', 'error');
      return;
    }
    showSnackbar('Deleting appointment, please wait...', 'i');
    dispatch(deleteAppointmentSF({ id })).then((res) => {
      if (res.type.includes('rejected')) {
        showSnackbar('Failed to delete appointment', 'e');
      } else {
        showSnackbar('Appointment deleted successfully', 's');
      }
    });
  };

  return (
    <div className="flex flex-row p-[20px] gap-[20px]">
      <div className="flex flex-col py-[10px] justify-between w-2/12">
        <div className="flex flex-col items-center">
          <Button
            className="rounded-none mb-[12px] bg-primary-blue hover:bg-primary-blue"
            variant="contained"
            aria-label="Cancel"
            onClick={() => setRsOpen(true)}
          >
            Reschedule
          </Button>
          <CustomDialog open={rsOpen} handleClose={() => setRsOpen(false)}>
            <Reschedule appointment={appointment} handleClose={() => setRsOpen(false)} />
          </CustomDialog>
          <Button
            className="rounded-none mb-[20px] border-grey-800"
            variant="outlined"
            aria-label="Cancel"
            onClick={() => setDeleteOpen(true)}
          >
            Cancel
          </Button>
          <ConfirmDialog
            handleDelete={handleDelete}
            open={deleteOpen}
            variant="red"
            btnText="Confirm"
            handleClose={() => setDeleteOpen(false)}
            title="Cancel Appointment"
            subTitle="This action cannot be undone."
          />
          <Typography
            variant="h6"
            color="inherit"
            className="text-[16px] mb-[16px] font-[600] text-dark-800"
          >
            Customer Details
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            className="text-[14px] mb-[10px] font-[400] text-dark-800"
          >
            {user?.email || '-'}
          </Typography>
          <Typography className="text-[14px] font-[400] text-dark-800 mb-[16px]">
            {user?.phone_number || '-'}
          </Typography>
        </div>
        <Typography className="text-[12px] text-center font-[400] text-[#ACACAC]">
          Created on {convertDateToString(appointment.created_at)}
        </Typography>
      </div>
      <div className="flex flex-col w-10/12 justify-between">
        <div>
          {product?.map((productItem) => (
            <SingleProduct key={productItem.id} product={productItem} />
          ))}
        </div>
        <AddNote appointment={appointment} />
      </div>
    </div>
  );
};

const SingleAppointment = (props) => {
  const { appointment } = props;
  const chipColorMap = {
    'Live Stream': {
      color: '#FA541C',
      borderColor: '#FFBB96',
      backgroundColor: '#FFF2E8',
    },
    'Live Chat': {
      color: '#1890FF',
      borderColor: '#91D5FF',
      backgroundColor: '#E6F7FF',
    },
    'Shop Visit': {
      color: '#1890FF',
      borderColor: '#91D5FF',
      backgroundColor: '#E6F7FF',
    },
    'Not Specified': {
      color: '#000000',
      borderColor: '#000000',
      backgroundColor: '#FFFFFF',
    },
  };

  return (
    <>
      <CustomAccordionV2
        title={<AppointmentTitle appointment={appointment} chipColorMap={chipColorMap} />}
        index={appointment.id}
      >
        <AppointmentChild appointment={appointment} />
      </CustomAccordionV2>
    </>
  );
};

const AppointmentItem = (props) => {
  const { item, date } = props;

  return (
    <div className="flex flex-col">
      <div className="flexitems-center justify-start px-[20px] py-[15px] bg-dark">
        <Typography className="text-[14px] font-[600] text-white">
          <DayAndFullDate value={date} />
        </Typography>
      </div>
      {item &&
        item.map((appointment, index) => (
          <SingleAppointment key={index} appointment={appointment} />
        ))}
    </div>
  );
};

export default AppointmentItem;
