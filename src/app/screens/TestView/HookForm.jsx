import { useState } from 'react';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CustomInput } from 'app/components';
import GenderSelect from './GenderSelect';

/**
 * Form Validation Schema
 */
const schema = yup.object({
  f_name: yup
    .string()
    .required('First Name is required')
    .min(3, 'First Name must be at least 2 characters')
    .max(50, 'First Name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  gender: yup.string(),
});

const CustomerEditForm = ({ userDetails }) => {
  const [defaultValues, setDefaultValues] = useState({
    f_name: userDetails?.f_name || '',
    email: userDetails?.email || '',
    gender: userDetails?.gender || '',
  });

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });

  // console.log('Watching form fields', watch('gender'));

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };
    console.log('🚀 ~ file: HookForm.jsx ~ line 45 ~ onSubmit ~ payload', payload);
  };

  return (
    <form
      name="addProductForm"
      noValidate
      className="flex flex-col justify-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1 p-[30px] gap-[20px] bg-grey-50">
        <section className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              User Profile
              <Tooltip title="Customer Profile" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row gap-[10px]">
            <Button
              className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
              variant="contained"
              aria-label="CREATE"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
            >
              Save
            </Button>
          </div>
        </section>
        <section className="flex flex-col gap-[10px] w-full">
          <div className="flex flex-row gap-[20px] w-full">
            <div className="flex flex-col  w-full justify-start">
              <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
                Name
              </Typography>
              <CustomInput
                name="f_name"
                className="mb-[32px]"
                control={control}
                error={!!errors.f_name}
                helperText={errors?.f_name?.message || ''}
              />
            </div>
            <div className="flex flex-col  w-full justify-start">
              <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
                Email
              </Typography>
              <CustomInput
                name="email"
                className="mb-[32px]"
                control={control}
                error={!!errors.email}
                helperText={errors?.email?.message || ''}
              />
            </div>
          </div>
          <div>
            <GenderSelect getValues={getValues} setValue={setValue} />
          </div>
        </section>
      </div>
    </form>
  );
};

export default CustomerEditForm;
