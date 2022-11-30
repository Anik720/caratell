import clsx from 'clsx';
import _ from 'lodash';
import { useEffect } from 'react';
import { Typography, Tooltip, Button, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSnackbar } from 'app/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus, setAvailabilityType, updateAllAvailability } from './store/availabilitySlice';
import EditWeekly from './EditWeekly';
import EditDateOverrides from './EditDateOverrides';
import validateAvailability from './AvailabilityValidate';

const TabButton = (props) => {
  const { setAvType, avType, currentValue } = props;
  return (
    <Box
      onClick={() => {
        setAvType(currentValue);
      }}
      sx={{
        borderBottom: avType == currentValue ? '2px solid rgb(33 150 243)' : 'none',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <div
        className={clsx(
          'py-[10px] px-[15px] text-[16px] font-[600]',
          avType == currentValue ? 'text-primary-blue font-bold' : 'text-dark-800'
        )}
      >
        {_.startCase(currentValue).replace(/_/g, ' ')}
      </div>
    </Box>
  );
};

function AvailabilityEdit() {
  const showSnackbar = useSnackbar();
  const dispatch = useDispatch();

  const avType = useSelector(({ availabilityStore }) => availabilityStore.availability.avType);
  const allAv = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.all_availability
  );
  const updatedStatus = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.update_status
  );

  useEffect(() => {
    if (updatedStatus == 'succeeded') {
      showSnackbar('Availability updated successfully', 's');
    } else if (updatedStatus == 'failed') {
      showSnackbar('Error updating availability', 'e');
    }
    return () => {
      dispatch(clearStatus({ type: 'update_status' }));
    };
  }, [dispatch, showSnackbar, updatedStatus]);

  const setAvType = (type) => {
    dispatch(setAvailabilityType(type));
  };

  const handleSave = () => {
    try {
      showSnackbar('Saving availability...');
      const { status, message } = validateAvailability(allAv);
      if (!status) {
        showSnackbar(message || 'Please enter valid availability', 'e');
        return;
      }
      dispatch(updateAllAvailability());
    } catch (e) {
      console.log(e);
      showSnackbar("Can't save availability right now. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Availability
              <Tooltip title="Appoinment" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row">
            <div>
              <Button
                className="rounded-none h-[40px] bg-primary-blue hover:bg-primary-blue"
                variant="contained"
                onClick={handleSave}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-[20px]">
          <div className="flex flex-row">
            {['shop_visit', 'live_chat', 'live_stream'].map((item, index) => (
              <TabButton key={index} currentValue={item} avType={avType} setAvType={setAvType} />
            ))}
          </div>
        </div>
        <div className="flex gap-[25px]">
          <EditWeekly avType={avType} />
          <EditDateOverrides avType={avType} />
        </div>
      </div>
    </div>
  );
}

export default AvailabilityEdit;
