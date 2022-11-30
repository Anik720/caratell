/* eslint-disable unused-imports/no-unused-imports */
import _ from '@lodash';
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CustomInput, ImageUpload, CustomSelect, CIMG } from 'app/components';
import { updateCompanyInfoSF } from 'app/store/appstore/settingStore/settingsSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'app/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import {
  getLastUrlFromImageArray,
  getImageArrayFromUrl,
  valueLabelToString,
  stringToValueLabel,
} from 'app/utils';
import { paymentTermOptions } from 'app/static-data/settings';

import api from 'app/APIs/caratell-service/apiService';

const URL =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const schema = yup.object({
  companyLogo: yup.array(),
  company_name: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .max(50, 'Should be less than 50 characters long')
    .required(),
  email: yup.string().email('Invalid email').required(),
  website: yup.string().matches(URL, 'Enter a valid url'),
  company_mobile: yup.string().required(),
  company_office: yup.string(),
  postal_code: yup.string().required(),
  unit_no: yup.string(),
  address: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .max(500, 'Should be less than 500 characters long'),
  invoice_suffix: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .max(3, 'Should be less than 3 characters long')
    .required(),
  invoice_no: yup.string(),
  payment_term: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required(),
  uen: yup.string().required(),
});

function UploadCompanyLogo({ formProps }) {
  const companyLogoArr = useWatch({
    control: formProps.control,
    name: 'companyLogo',
  });
  const companyLogoImage = getLastUrlFromImageArray(companyLogoArr);
  return (
    <div className="flex w-[450px] mx-auto flex-col bg-light-50">
      <Typography className="text-[14px] text-black font-[600] text-center mb-[10px]">
        Company Logo
      </Typography>
      <ImageUpload
        getValues={formProps.getValues}
        setValue={formProps.setValue}
        fieldName="companyLogo"
        maxFileSize={1024 * 1024 * 2}
        subtitle1="Maximum upload file size: 2 MB"
        subtitle2="Recommended Dimensions: 200 x 200 pixels"
      />
      <div className="w-full flex justify-center">
        <div className="bg-black p-[10px] m-[10px] w-[110px]">
          <CIMG
            src={companyLogoImage || 'assets/images/logos/CaratellLogoWhite.png'}
            sw="200px"
            wh="200px"
            w="100%"
            h="100%"
          />
        </div>
      </div>
    </div>
  );
}

/*
 * Containers
 */
function CompanyInfo({ formProps }) {
  return (
    <div className="flex flex-col w-full bg-light-50 p-[20px] gap-[24px]">
      <Typography className="text-[20px] text-black font-[600]">Company Information</Typography>
      <UploadCompanyLogo formProps={formProps} />
      <div className="flex flex-row gap-[24px]">
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">
            <span className="text-red">*</span>Company Name
          </Typography>
          <CustomInput
            name="company_name"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.company_name}
            helperText={formProps.errors?.company_name?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">
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
      </div>
      <div className="flex flex-row gap-[24px]">
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">Website</Typography>
          <CustomInput
            name="website"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.website}
            helperText={formProps.errors?.website?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">
            <span className="text-red">*</span>Company Mobile
          </Typography>
          <CustomInput
            name="company_mobile"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.company_mobile}
            helperText={formProps.errors?.company_mobile?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">
            Company Office
          </Typography>
          <CustomInput
            name="company_office"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.company_office}
            helperText={formProps.errors?.company_office?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
      </div>
      <div className="flex flex-row gap-[24px]">
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">
            <span className="text-red">*</span>Postal Code
          </Typography>
          <CustomInput
            name="postal_code"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.postal_code}
            helperText={formProps.errors?.postal_code?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
        <div className="w-full">
          <Typography className="text-[14px] text-black font-[600] mb-[5px]">Unit</Typography>
          <CustomInput
            name="unit_no"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.unit_no}
            helperText={formProps.errors?.unit_no?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
      </div>
      <div className="flex flex-row gap-[24px]">
        <div className="w-full">
          <CustomInput
            name="address"
            control={formProps.control}
            className="bg-white"
            error={!!formProps.errors.address}
            helperText={formProps.errors?.address?.message}
            type="text"
            size="small"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
}

function InvoiceInfo({ formProps }) {
  return (
    <div className="flex flex-col w-full bg-light-50 p-[20px] gap-[24px]">
      <Typography className="text-[20px] text-black font-[600]">Invoice Information</Typography>
      <div className="flex flex-col gap-[24px] w-[75%]">
        <div className="flex flex-row gap-[24px]">
          <div className="w-full">
            <Typography className="text-[14px] text-black font-[600] mb-[5px]">
              <span className="text-red">*</span>Invoice Suffix
            </Typography>
            <CustomInput
              name="invoice_suffix"
              control={formProps.control}
              className="bg-white"
              error={!!formProps.errors.invoice_suffix}
              helperText={formProps.errors?.invoice_suffix?.message}
              type="text"
              size="small"
              variant="outlined"
            />
          </div>
          <div className="w-full">
            <Typography className="text-[14px] text-black font-[600] mb-[5px]">
              Invoice Number
            </Typography>
            <CustomInput
              name="invoice_no"
              control={formProps.control}
              className="bg-white"
              error={!!formProps.errors.invoice_no}
              helperText={formProps.errors?.invoice_no?.message}
              type="text"
              size="small"
              variant="outlined"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[24px]">
          <div className="w-full">
            <Typography className="text-[14px] text-black font-[600] mb-[5px]">
              <span className="text-red">*</span>Payment Terms
            </Typography>
            <CustomSelect
              name="payment_term"
              control={formProps.control}
              options={paymentTermOptions}
            />
          </div>
          <div className="w-full">
            <Typography className="text-[14px] text-black font-[600] mb-[5px]">
              <span className="text-red">*</span>UEN
            </Typography>
            <CustomInput
              name="uen"
              control={formProps.control}
              className="bg-white"
              error={!!formProps.errors.uen}
              helperText={formProps.errors?.uen?.message}
              type="text"
              size="small"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const CompanyInfoForm = ({ companyDetails }) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      companyLogo: getImageArrayFromUrl(companyDetails.image || ''),
      company_name: companyDetails.company_name || '',
      email: companyDetails.email || '',
      website: companyDetails.website || '',
      company_mobile: companyDetails.company_mobile || '',
      company_office: companyDetails.company_office || '',
      postal_code: companyDetails.postal_code || '',
      unit_no: companyDetails.unit_no || '',
      address: companyDetails.address || '',
      invoice_suffix: companyDetails.invoice_suffix || '',
      invoice_no: companyDetails.invoice_no || '',
      payment_term: stringToValueLabel(companyDetails.payment_term || ''),
      uen: companyDetails.uen || '',
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        image: getLastUrlFromImageArray(data.companyLogo),
        company_name: data.company_name,
        email: data.email,
        website: data.website,
        company_mobile: data.company_mobile,
        company_office: data.company_office,
        postal_code: data.postal_code,
        unit_no: data.unit_no,
        address: data.address,
        invoice_suffix: data.invoice_suffix,
        invoice_no: data.invoice_no,
        payment_term: valueLabelToString(data.payment_term),
        uen: data.uen,
      };
      showSnackbar('Updating company details...');
      dispatch(updateCompanyInfoSF(payload)).then(() => {
        showSnackbar('Company info updated successfully', 's');
        navigate('/settings/company-information');
      });
    } catch (error) {
      console.log('🚀 ~ file: CompanyInfoForm.jsx ~ line 353 ~ onSubmit ~ error', error);
      showSnackbar('Error updating company info', 'e');
    }
  };

  // console.log('watching values', watch());
  // console.log('Control', control);

  return (
    <form
      name="settingsInfoForm"
      noValidate
      className="flex flex-col justify-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1 p-[30px] gap-[20px] bg-grey-50">
        <section className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Settings
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
              Save
            </Button>
          </div>
        </section>
        <section className="flex flex-col gap-[20px]">
          <CompanyInfo
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
          <InvoiceInfo
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

export default CompanyInfoForm;
