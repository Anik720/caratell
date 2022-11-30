/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'app/hooks';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  SingleFileUploadWithProgress,
  UploadError,
} from 'app/components/ImageUpload/UploadHelpers';
import { CustomDialog } from 'app/components';

import pageData from './addProductData';

const validateWidthAndHeight = (file, width = 300, height = 300) => {
  const image = new Image();
  image.src = file;
  return new Promise((resolve, reject) => {
    image.onload = () => {
      if (image.width < width || image.height < height) {
        reject(new Error(`Image must be at least ${width}x${height}px`));
      }
      resolve();
    };
  });
};

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    width: '100%',
    border: `1px dashed ${theme.palette.primary.main}`,
    borderRadius: '6.4px',
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}));

const ProductUpload = ({ getValues, setValue }) => {
  const showSnackbar = useSnackbar();
  const classes = useStyles();
  const [imgFile, setImgFile] = useState({});
  const [uploadedImages, setUploadedImages] = useState(getValues('images'));
  const [rejectedFile, setRejectedFile] = useState(null);

  const onDrop = useCallback((accFiles, rejFiles) => {
    if (accFiles.length > 0) {
      const fileObj = accFiles.find((f) => f);
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onload = () => {
        validateWidthAndHeight(reader.result, 300, 300)
          .then(() => {
            fileObj.id = getNewId();
            fileObj.errors = [];
            setImgFile(fileObj);
            setRejectedFile(null);
          })
          .catch((err) => {
            console.log(err.message);
            showSnackbar('Image must be in valid size', 'e');
          });
      };
    }
    if (rejFiles.length > 0) {
      const fileObj = rejFiles[0].file;
      fileObj.errors = rejFiles[0].errors;
      setRejectedFile(fileObj);
    }
  }, []);

  useEffect(() => {
    setValue('images', uploadedImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [uploadedImages]);

  function onUpload(fileObj) {
    if (fileObj && fileObj.url) setUploadedImages((prev) => [...prev, fileObj]);
  }

  function onDelete(imgId) {
    setUploadedImages((curr) => curr.filter((fw) => fw.id !== imgId));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
    maxSize: 1024 * 1024 * 2, // 2MB
    // onDragEnter set background color to blue
    onDragEnter: () => {
      // set background color to blue
      console.log(classes.dropzone);
    },
  });

  const [open, setOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const handleClickOpen = (imgurl) => {
    setModalImg(imgurl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col p-[16px] w-full bg-white rounded-2">
      <div className={classes.dropzone}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex flex-col justify-center items-center p-[16px]">
            <DriveFolderUploadIcon className="text-primary-blue w-[35px] h-[35px] mb-[22px]" />
            <Typography color="inherit" className="mt-8 font-medium text-center text-base">
              {pageData.UPLOAD_IMAGE}
            </Typography>
            <Typography variant="subtitle1" color="inherit" className="mt-8 text-center">
              {pageData.UPLOAD_IMAGE_DESC}
            </Typography>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          {rejectedFile && (
            <UploadError
              file={rejectedFile.file}
              errors={rejectedFile.errors}
              onDelete={onDelete}
            />
          )}
          {!rejectedFile && imgFile && imgFile.id && (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              imgFile={imgFile}
            />
          )}
        </div>
      </div>
      <Typography variant="h6" color="inherit" className="font-medium mt-16 mb-16 text-grey-600">
        {pageData.UPLOADED_IMAGE}
      </Typography>
      <div className="flex flex-row max-w-full overflow-x-scroll gap-4">
        {uploadedImages &&
          uploadedImages.map((image, index) => (
            <div
              key={index}
              className="min-w-[104px] h-[104px] p-[8px] border-1 border-gray-300 mb-[12px]"
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <VisibilityIcon
                    className="text-white text-xl m-6 cursor-pointer"
                    onClick={() => {
                      handleClickOpen(image.url);
                    }}
                  />

                  <DeleteOutlineIcon
                    className="text-white text-xl m-6 cursor-pointer"
                    onClick={() => onDelete(image.id)}
                  />
                </Box>
                <img className="max-w-full max-h-full z-10" src={image.url} alt="Product" />
              </Box>
            </div>
          ))}
      </div>
      <CustomDialog open={open} handleClose={handleClose}>
        <div className="w-full h-full">
          <img className="max-w-full max-h-full" src={modalImg} alt="img" />
        </div>
      </CustomDialog>
    </div>
  );
};

export default ProductUpload;
