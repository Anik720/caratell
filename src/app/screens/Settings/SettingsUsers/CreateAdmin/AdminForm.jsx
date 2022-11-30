import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CustomInput } from 'app/components';
import { useSnackbar } from 'app/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import api from 'app/APIs/caratell-service/apiService';
import AccessTree from './AccessTree';
/*
 * Blog Input and Output
 */
function ProfileInformation({ formProps }) {
  return (
    <div className="bg-white border-t-1 border-l-1 border-b-1  border-grey-300 flex flex-col w-6/12 gap-[24px] px-[30px] py-[22px]">
      <Typography className="text-[22px] text-black font-[600] mb-[16px]">
        Profile Information
      </Typography>
      <div className="flex gap-[10px]">
        <div className="flex flex-col">
          <Typography className="text-[16px] text-black font-[600] mb-[8px]">First Name</Typography>
          <CustomInput
            name="first_name"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.first_name}
            helperText={formProps.errors?.first_name?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
        <div className="flex flex-col">
          <Typography className="text-[16px] text-black font-[600] mb-[8px]">Last Name</Typography>
          <CustomInput
            name="last_name"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.last_name}
            helperText={formProps.errors?.last_name?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Typography className="text-[16px] text-black font-[600] mb-[8px]">
          <span className="text-red">*</span> Admin Name(Username)
        </Typography>
        <CustomInput
          name="adminName"
          control={formProps.control}
          className="bg-white"
          error={!!formProps.errors.adminName}
          helperText={formProps.errors?.adminName?.message}
          type="text"
          size="small"
          variant="outlined"
        />
      </div>
      <div className="flex flex-col">
        <Typography className="text-[16px] text-black font-[600] mb-[8px]">
          <span className="text-red">*</span>Email
        </Typography>
        <CustomInput
          name="email"
          control={formProps.control}
          className="bg-white"
          error={!!formProps.errors.email}
          helperText={formProps.errors?.email?.message}
          type="text"
          size="small"
          variant="outlined"
        />
      </div>
      <div className="flex flex-col">
        <Typography className="text-[16px] text-black font-[600] mb-[8px]">
          <span className="text-red">*</span>Company Role
        </Typography>
        <CustomInput
          name="companyRole"
          control={formProps.control}
          className="bg-white"
          error={!!formProps.errors.companyRole}
          helperText={formProps.errors?.companyRole?.message}
          type="text"
          size="small"
          variant="outlined"
        />
      </div>
      <div className="flex flex-col">
        <Typography className="text-[16px] text-black font-[600] mb-[8px]">
          <span className="text-red">*</span>Password
        </Typography>
        <CustomInput
          name="password"
          control={formProps.control}
          className="bg-white"
          error={!!formProps.errors.password}
          helperText={formProps.errors?.password?.message}
          type="password"
          size="small"
          variant="outlined"
        />
      </div>
      <div className="flex flex-col">
        <Typography className="text-[16px] text-black font-[600] mb-[8px]">
          <span className="text-red">*</span>Confirm Password
        </Typography>
        <CustomInput
          name="confirmPassword"
          control={formProps.control}
          className="bg-white"
          error={!!formProps.errors.confirmPassword}
          helperText={formProps.errors?.confirmPassword?.message}
          type="password"
          size="small"
          variant="outlined"
        />
      </div>
    </div>
  );
}

function AccessRights({ formProps }) {
  return (
    <div className="bg-white border-1  border-grey-200 flex flex-col w-6/12 gap-[24px] px-[30px] py-[22px]">
      <AccessTree formProps={formProps} />
    </div>
  );
}

const AdminForm = ({ adminDetails }) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const schema = yup.object({
    // adminName: yup.string().required('Admin Name is required'),
    first_name: yup.string(),
    last_name: yup.string(),
    adminName: yup
      .string()
      .required('Admin Name is required')
      .matches(
        /^[a-zA-Z0-9]{3,}$/,
        'Admin Name should not contain spaces, should be alphanumeric and should be at least 3 characters long'
      ),
    email: yup.string().email('Email is invalid').required('Email is required'),
    companyRole: yup.string().required('Company Role is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    accessRights: yup.array().required('Access Rights is required'),
  });

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      adminName: adminDetails.adminName || '',
      first_name: adminDetails.first_name || '',
      last_name: adminDetails.last_name || '',
      email: adminDetails.email || '',
      companyRole: adminDetails.companyRole || '',
      password: '',
      confirmPassword: '',
      accessRights: adminDetails.accessRights || [],
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        adminName: data.adminName,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        roles: [data.companyRole],
        password: data.password,
      };
      if (adminDetails.id) {
        showSnackbar('Updating Admin Profile...');
        payload.id = adminDetails.id;
        await api.updateAdmin(payload);
        showSnackbar('Admin Profile Updated Successfully');
        navigate('/settings/users');
      } else {
        showSnackbar('Creating Admin Profile...');
        await api.createAdmin(payload);
        showSnackbar('Admin Profile Created Successfully');
        navigate('/settings/users');
      }
    } catch (err) {
      showSnackbar(err, 'e');
    }
  };

  // console.log('watching values', watch());
  // console.log('Control', control);

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
              Admin Profile
              <Tooltip title="Create Post" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row gap-[10px]">
            <Button
              className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
              variant="contained"
              aria-label="Publish"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              {adminDetails.id ? 'Update' : 'Create'}
            </Button>
          </div>
        </section>
        <section className="flex flex-row">
          <ProfileInformation
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
          <AccessRights
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
        </section>
      </div>
    </form>
  );
};

export default AdminForm;
