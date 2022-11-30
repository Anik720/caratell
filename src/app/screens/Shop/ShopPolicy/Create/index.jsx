/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable unused-imports/no-unused-imports */
import _ from '@lodash';
import clsx from 'clsx';
import { Typography, Tooltip, Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {
  CustomInput,
  CustomSelect,
  CIMG,
  Editor,
  EditorPreview,
  ImageUpload,
  CustomAccordionV2,
} from 'app/components';
import { useSnackbar } from 'app/hooks';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { truncateString } from 'app/utils';
import api from 'app/APIs/caratell-service/apiService';

function PolicyPreview({ formProps }) {
  const { control, getValues } = formProps;
  const title = useWatch({
    control,
    name: 'title',
  });
  const content = useWatch({
    control,
    name: 'content',
  });

  return (
    <div className="box-border flex flex-col relative">
      <div className="mt-[20px]">
        <CustomAccordionV2
          title={
            <Typography className="font-[600] text-gold text-[18px]">
              {truncateString(title, 30) || 'Title'}
            </Typography>
          }
          index={1}
          sx={{
            border: '1px solid #D8D8D8',
          }}
        >
          <div className="p-[10px] overflow-x-auto max-h-[520px] overflow-y-auto">
            <EditorPreview content={content} />
          </div>
        </CustomAccordionV2>
      </div>
    </div>
  );
}

/*
 * Policy Input and Output
 */
function PolicyInput({ formProps }) {
  const { getValues, setValue, control, formState, errors } = formProps;

  return (
    <div className="flex flex-col w-[60%] p-[25px] bg-white rounded-4">
      <Typography className="font-[400] text-black text-[16px] mb-[10px]">
        Policy Information
      </Typography>
      <CustomInput
        name="title"
        control={control}
        className="bg-white"
        error={!!errors.title}
        helperText={errors?.title?.message}
        type="text"
        size="small"
        variant="outlined"
      />
      <div className="flex w-full flex-col mt-[25px]">
        <Editor control={control} name="content" errors={errors?.content?.message} />
      </div>
    </div>
  );
}

function PolicyOutput({ formProps }) {
  return (
    <div className="flex flex-col w-[40%] p-[25px] bg-white rounded-4 h-auto">
      <Typography className="font-[400] text-black text-[16px] mb-[16px]">Preview</Typography>
      <PolicyPreview formProps={formProps} />
    </div>
  );
}

const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(50, 'Title cannot be more than 50 characters'),
  content: yup
    .string()
    .required('Content is required')
    .max(5000, 'Policy content cannot be more than 5000 characters'),
});

const CreateShopPolicy = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.content,
      };
      showSnackbar('Creating policy...');
      await api.createPolicy(payload);
      showSnackbar('Policy created successfully', 's');
      window.location.href = '/shop/policy';
    } catch (error) {
      showSnackbar('Error creating policy', 'e');
    }
  };

  // console.log('watching values', watch());

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
              Create Banner
              <Tooltip title="Create Banner" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row gap-[10px]">
            <Button
              component={Link}
              to="/content/blog"
              className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
              variant="contained"
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button
              className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
              variant="contained"
              aria-label="Publish"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Create
            </Button>
          </div>
        </section>
        <section className="flex flex-row gap-[15px]">
          <PolicyInput
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
          <PolicyOutput
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

export default CreateShopPolicy;
