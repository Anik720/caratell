/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useSnackbar } from 'app/hooks';
import { SingleFileUploadWithProgress, UploadError } from './UploadHelpers';

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
    height: '100%',
    border: `1px dashed ${theme.palette.primary.main}`,
    borderRadius: '6.4px',
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    outline: 'none',
  },
}));

const ImageUpload = (props) => {
  const showSnackbar = useSnackbar();

  const { getValues, setValue, fieldName, maxFileSize, subtitle1, subtitle2 } = props;
  const classes = useStyles();
  const [imgFile, setImgFile] = useState([]);
  const [uploadedImages, setUploadedImages] = useState(getValues(fieldName));
  const [rejectedFile, setRejectedFile] = useState(null);

  const onDrop = useCallback((accFiles, rejFiles) => {
    if (accFiles.length > 0) {
      const fileObj = accFiles.find((f) => f);
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onload = () => {
        validateWidthAndHeight(reader.result, 100, 100)
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
    setValue(fieldName, uploadedImages);
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
    maxSize: maxFileSize,
    // onDragEnter set background color to blue
    onDragEnter: () => {
      // set background color to blue
      console.log(classes.dropzone);
    },
  });

  return (
    <div className="flex flex-col w-full bg-white rounded-2">
      <div className={classes.dropzone}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex flex-col justify-center items-center p-[16px]">
            <DriveFolderUploadIcon className="text-primary-blue w-[35px] h-[35px] mb-[22px]" />
            <Typography color="inherit" className="mt-8 font-medium text-center text-base">
              Click or drag file to this area to upload
            </Typography>
            <Typography variant="subtitle1" color="inherit" className="mt-8 text-center">
              {subtitle1 || `Maximum upload file size: ${maxFileSize / 1024 / 1024} MB`}
            </Typography>
            <Typography variant="subtitle1" color="inherit" className="text-center">
              {subtitle2 || `Recommended Dimensions: 500 x 500 pixels`}
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
    </div>
  );
};

ImageUpload.propTypes = {
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  maxFileSize: PropTypes.number.isRequired,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
};

export default ImageUpload;
