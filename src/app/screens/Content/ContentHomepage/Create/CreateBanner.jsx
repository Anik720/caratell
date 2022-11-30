/* eslint-disable no-nested-ternary */
import _ from '@lodash';
import clsx from 'clsx';
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CustomInput, CIMG, ImageUpload } from 'app/components';
import { useSnackbar } from 'app/hooks';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { getLastUrlFromImageArray, getImageArrayFromUrl, truncateString } from 'app/utils';

import api from 'app/APIs/caratell-service/apiService';

const schema = yup.object({
  subtitle: yup
    .string()
    .required('Subtitle is required')
    .max(50, 'Subtitle cannot be more than 50 characters'),
  heading: yup
    .string()
    .required('Heading is required')
    .max(50, 'Heading cannot be more than 50 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(200, 'Description cannot be more than 200 characters'),
  textAlignment: yup.string().required('Text alignment is required'),
  callToAction: yup.string().required('Call to action is required'),
  thumbnail: yup.array().required('Thumbnail is required'),
  contentImage: yup.array(),
});

function UploadThumbnail({ formProps }) {
  return (
    <div className="flex w-7/12 flex-col">
      <ImageUpload
        getValues={formProps.getValues}
        setValue={formProps.setValue}
        fieldName="thumbnail"
        maxFileSize={1024 * 1024 * 2}
        subtitle1="Maximum upload file size: 2 Mb"
        subtitle2="Recommended dimensions: 400x200px"
      />
    </div>
  );
}

function ThumbnailOptions({ formProps }) {
  const alignState = useWatch({ control: formProps.control, name: 'textAlignment' });
  const callToActionState = useWatch({
    control: formProps.control,
    name: 'callToAction',
  });

  const alignButtonList = [
    {
      label: 'Left',
      value: 'left',
      icon: <FormatAlignLeftIcon />,
    },
    {
      label: 'Center',
      value: 'center',
      icon: <FormatAlignCenterIcon />,
    },
    {
      label: 'Right',
      value: 'right',
      icon: <FormatAlignRightIcon />,
    },
  ];

  const callToActionButtonList = [
    {
      label: 'Live Chat',
      value: 'liveChat',
    },
    {
      label: 'Brochure',
      value: 'brochure',
    },
    {
      label: 'None',
      value: 'none',
    },
  ];

  const handleCallToAction = (value) => {
    formProps.setValue('callToAction', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleAlign = (value) => {
    formProps.setValue('textAlignment', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex w-5/12 flex-col p-[5px]">
      <Typography className="font-[400] text-black text-[16px] mb-[10px]">
        Text Alignment
      </Typography>
      <div className="flex flex-row">
        {alignButtonList.map((button, index) => (
          <div
            key={index}
            className={clsx(
              'p-[10px] cursor-pointer border-1 border-grey-300',
              alignState == button.value ? 'bg-primary-blue text-white border-primary-blue' : ''
            )}
            variant="outlined"
            aria-label={button.value}
            onClick={() => handleAlign(button.value)}
          >
            {button.icon}
          </div>
        ))}
      </div>
      <Typography className="font-[400] text-black text-[16px] mb-[5px] mt-[10px]">
        Call to Action
      </Typography>
      <div className="flex flex-row items-center justify-start">
        {callToActionButtonList.map((button, index) => (
          <div
            key={index}
            className={clsx(
              'p-[8px] cursor-pointer border-1 border-grey-300 text-[14px]',
              callToActionState == button.value
                ? 'bg-primary-blue text-white border-primary-blue'
                : ''
            )}
            variant="outlined"
            aria-label="liveChat"
            onClick={() => handleCallToAction(button.value)}
          >
            {button.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function BannerPreview({ formProps }) {
  const thumbnail = useWatch({ control: formProps.control, name: 'thumbnail' });
  const thumbnailImage = getLastUrlFromImageArray(thumbnail);
  const alignment = useWatch({ control: formProps.control, name: 'textAlignment' });

  const subtitle = useWatch({ control: formProps.control, name: 'subtitle' });
  const heading = useWatch({ control: formProps.control, name: 'heading' });
  const description = useWatch({ control: formProps.control, name: 'description' });
  return (
    <div className="box-border flex flex-col relative h-[207px]">
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <CIMG src={thumbnailImage || 'assets/images/etc/coverPreview.jpg'} w="100%" h="100%" />
      </div>
      <div
        className={clsx(
          'absolute flex z-20 flex-col h-full w-full justify-center p-[24px] bg-black bg-opacity-70',
          alignment == 'left' ? 'items-start' : alignment == 'center' ? 'items-center' : 'items-end'
        )}
      >
        <Typography className="font-[300] text-white text-[10px]">
          {subtitle || 'Subtitle'}
        </Typography>
        <Typography className="font-[800] text-light text-[22px]">
          {heading || 'Heading'}
        </Typography>
        <Typography className="font-[500] text-light text-[16px]">
          {truncateString(description, 28) || 'Description'}
        </Typography>
      </div>
    </div>
  );
}

function ContentPreview({ formProps }) {
  const contentImage = useWatch({ control: formProps.control, name: 'contentImage' });
  const contentImageUrl = getLastUrlFromImageArray(contentImage);
  return (
    <div className="relative">
      <div className="w-full h-full">
        <CIMG src={contentImageUrl || 'assets/images/etc/brochurePreview.png'} />
      </div>
    </div>
  );
}

/*
 * Blog Input and Output
 */
function BannerInput({ formProps }) {
  return (
    <div className="flex flex-col w-[65%] p-[25px] bg-white rounded-4">
      <Typography className="font-[400] text-black text-[16px] mb-[10px]">
        Upload Thumbnail
      </Typography>
      <div className="flex flex-row gap-[10px]">
        <UploadThumbnail formProps={formProps} />
        <ThumbnailOptions formProps={formProps} />
      </div>
      <Typography className="font-[600] text-black text-[16px] mt-[24px] mb-[10px]">
        Subtitle
      </Typography>
      <CustomInput
        name="subtitle"
        control={formProps.control}
        className="bg-white"
        error={!!formProps.errors.subtitle}
        helperText={formProps.errors?.subtitle?.message}
        type="text"
        size="small"
        variant="outlined"
      />
      <Typography className="font-[400] text-grey text-[14px] mb-[10px]">
        Maximum 50 charcaters
      </Typography>

      {/* Heading */}
      <Typography className="font-[600] text-black text-[16px] mt-[24px] mb-[10px]">
        Heading
      </Typography>
      <CustomInput
        name="heading"
        control={formProps.control}
        className="bg-white"
        error={!!formProps.errors.heading}
        helperText={formProps.errors?.heading?.message}
        type="text"
        size="small"
        variant="outlined"
      />
      <Typography className="font-[400] text-grey text-[14px] mb-[10px]">
        Maximum 50 charcaters
      </Typography>

      {/* Descriptiption */}
      <Typography className="font-[600] text-black text-[16px] mt-[24px] mb-[10px]">
        Description
      </Typography>
      <CustomInput
        name="description"
        control={formProps.control}
        className="bg-white"
        error={!!formProps.errors.description}
        helperText={formProps.errors?.description?.message}
        type="text"
        size="small"
        variant="outlined"
        multiline
        rows={5}
      />
      <Typography className="font-[400] text-grey text-[14px] mb-[10px]">
        Maximum 200 charcaters
      </Typography>
    </div>
  );
}

function BannerOutput({ formProps }) {
  return (
    <div className="flex flex-col w-[35%] p-[25px] bg-white rounded-4 h-auto">
      <Typography className="font-[400] text-black text-[16px] mb-[16px]">Preview</Typography>
      <BannerPreview formProps={formProps} />
    </div>
  );
}

function ContentInput({ formProps }) {
  return (
    <div className="w-[65%]">
      <div className="flex flex-col p-[25px] bg-white rounded-4">
        <Typography className="font-[400] text-black text-[16px] mb-[10px]">
          Upload Content
        </Typography>
        <ImageUpload
          getValues={formProps.getValues}
          setValue={formProps.setValue}
          fieldName="contentImage"
          maxFileSize={1024 * 1024 * 2}
          subtitle1="Maximum upload file size: 2 Mb"
          subtitle2="Maximum upload file width: 414px"
        />
      </div>
    </div>
  );
}

function ContentOutput({ formProps }) {
  return (
    <div className="w-[35%] h-full">
      <div className="flex flex-col p-[25px] bg-white rounded-4">
        <Typography className="font-[400] text-black text-[16px] mb-[16px]">Preview</Typography>
        <BannerPreview formProps={formProps} />
        <ContentPreview formProps={formProps} />
      </div>
    </div>
  );
}

const CreateBanner = ({ bannerDetails }) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      subtitle: bannerDetails.sub_title || '',
      heading: bannerDetails.heading || '',
      description: bannerDetails.description || '',
      textAlignment: bannerDetails.text_alignment || 'left',
      callToAction: bannerDetails.call_to_Action || 'liveChat',
      thumbnail: getImageArrayFromUrl(bannerDetails.image) || [],
      contentImage: getImageArrayFromUrl(bannerDetails.brochure_image) || [],
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        text_alignment: data.textAlignment,
        call_to_Action: data.callToAction,
        sub_title: data.subtitle,
        heading: data.heading,
        description: data.description,
        is_brochure: data.callToAction === 'brochure',
        brochure_image: getLastUrlFromImageArray(data.contentImage),
        image: getLastUrlFromImageArray(data.thumbnail),
      };
      if (bannerDetails.id) {
        await api.updateBanner(payload, bannerDetails.id);
        showSnackbar('Banner updated successfully');
      } else {
        await api.createBanner(payload);
        showSnackbar('Banner created successfully');
      }
      navigate('/content/homepage');
    } catch (err) {
      showSnackbar('Something went wrong', 'e');
    }
  };

  // console.log('watching values', watch());
  // console.log('Control', control);

  const callToAction = useWatch({ control, name: 'callToAction' });

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
              {bannerDetails.id ? 'Edit Banner' : 'Create Banner'}
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
              {bannerDetails.id ? 'Update' : 'Create'}
            </Button>
          </div>
        </section>
        <section className="flex flex-row gap-[15px]">
          <BannerInput
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
          <BannerOutput
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
        </section>
        {callToAction === 'brochure' && (
          <section className="flex flex-row gap-[15px]">
            <ContentInput
              formProps={{
                getValues,
                setValue,
                control,
                formState,
                errors,
              }}
            />
            <ContentOutput
              formProps={{
                getValues,
                setValue,
                control,
                formState,
                errors,
              }}
            />
          </section>
        )}
      </div>
    </form>
  );
};

export default CreateBanner;
