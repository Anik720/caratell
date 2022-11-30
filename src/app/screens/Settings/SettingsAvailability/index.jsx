/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import FuseLoading from '@fuse/core/FuseLoading';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'app/hooks';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import AvailabilityEdit from './AvailabilityEdit';
import { getAllAvailability } from './store/availabilitySlice';

function Availability() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const all_status = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.all_status
  );

  useEffect(() => {
    dispatch(getAllAvailability());
  }, []);

  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (all_status === 'succeeded') {
      setLoading(false);
    } else if (all_status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get availability list', 'e');
      setError('Failed to get availability list');
    }
  }, [all_status]);

  if (loading) {
    return <FuseLoading />;
  }

  if (error) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="text-center">{error}</div>
      </div>
    );
  }

  return <AvailabilityEdit />;
}

// export default Availability;
export default withReducer('availabilityStore', reducer)(Availability);
