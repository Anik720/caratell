import _ from '@lodash';
import { Typography, Tooltip, Button, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CustomInput, CIMG, ImageUpload } from 'app/components';
import { useSnackbar } from 'app/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import api from 'app/APIs/caratell-service/apiService';
import { getLastUrlFromImageArray } from 'app/utils';

const schema = yup.object({
  popupBanner: yup.array().required('Banner Image is required'),
  dailyAppearance: yup.number().required('Daily Appearance is required'),
});

function UploadBanner({ formProps }) {
  return (
    <div className="flex w-7/12 flex-col">
      <ImageUpload
        getValues={formProps.getValues}
        setValue={formProps.setValue}
        fieldName="popupBanner"
        maxFileSize={1024 * 1024 * 2}
        subtitle1="Maximum upload file size: 2 Mb"
        subtitle2="Recommended dimensions: 350x300px"
      />
    </div>
  );
}

function BannerOption({ formProps }) {
  return (
    <div className="flex w-5/12 flex-col p-[5px] justify-end">
      <Typography className="font-[400] text-black text-[16px] mb-[10px]">
        <span className="text-red">*</span>Delay Appearance
      </Typography>
      <CustomInput
        name="dailyAppearance"
        control={formProps.control}
        className="bg-white"
        error={!!formProps.errors.dailyAppearance}
        helperText={formProps.errors?.dailyAppearance?.message}
        type="number"
        size="small"
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">ms</InputAdornment>,
        }}
      />
    </div>
  );
}

function BannerPreview({ formProps }) {
  const popupBanner = useWatch({ control: formProps.control, name: 'popupBanner' });
  const popupBannerImg =
    popupBanner && popupBanner.length > 0 && popupBanner[popupBanner.length - 1].url;
  return (
    <div className="box-border flex flex-col relative h-[800px]">
      <div className="absolute z-10 w-auto h-[800px]">
        <CIMG src="assets/images/etc/popupBg.png" w="100%" h="100%" />
      </div>
      <div className="absolute z-20 w-full h-full flex justify-center items-center">
        <div className="relative w-[90%] h-auto shadow-lg">
          <CIMG src={popupBannerImg || 'assets/images/etc/popupPreview.png'} w="100%" h="100%" />
          <span className="absolute top-5 right-10 text-white text-[16px] cursor-grab">X</span>
        </div>
      </div>
    </div>
  );
}
/*
 * Content popup Input and Output
 */
function BannerInput({ formProps }) {
  return (
    <div className="flex flex-col w-[60%]">
      <div className="flex flex-col p-[25px] bg-white rounded-4">
        <Typography className="font-[400] text-black text-[16px] mb-[10px]">
          Collection Banner
        </Typography>
        <div className="flex flex-row gap-[10px]">
          <UploadBanner formProps={formProps} />
          <BannerOption formProps={formProps} />
        </div>
      </div>
    </div>
  );
}

function BannerOutput({ formProps }) {
  return (
    <div className="flex flex-col w-[40%] p-[25px] bg-white rounded-4 h-auto">
      <Typography className="font-[400] text-black text-[16px] mb-[16px]">Preview</Typography>
      <BannerPreview formProps={formProps} />
    </div>
  );
}

const CreateContentPopup = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      popupBanner: '',
      dailyAppearance: 0,
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        image: getLastUrlFromImageArray(data.popupBanner),
        daily_appearance: data.dailyAppearance,
      };
      await api.createPopup(payload);
      showSnackbar('Popup created successfully');
      navigate('/content/pop-up');
    } catch (err) {
      showSnackbar('Something went wrong', 'e');
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
              Promotion Popup
              <Tooltip title="Create Banner" placement="bottom-start" enterDelay={300}>
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
              Create
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
      </div>
    </form>
  );
};

export default CreateContentPopup;
