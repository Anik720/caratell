/* eslint-disable react-hooks/exhaustive-deps */

import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from 'app/APIs/caratell-service/apiService';

export function UploadError({ errors }) {
  return (
    <div className="w-full">
      {errors.map((error) => (
        <div key={error.code} className="w-full pl-[6px] py-2">
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </div>
  );
}

export function SingleFileUploadWithProgress({ imgFile, onUpload }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const file = imgFile;
    setProgress(0);
    async function upload() {
      const response = await uploadFile(file, setProgress);
      if (!response) return;
      const fileObj = {
        ...file,
        url: response.url,
        alt: file.name || 'Image',
      };
      onUpload(fileObj);
    }

    upload();
  }, [imgFile]);

  return <LinearProgress variant="determinate" value={progress} />;
}

async function uploadFile(file, onProgress) {
  try {
    const result = await api.uploadImage(file, onProgress);
    return result;
  } catch (error) {
    return null;
  }
}
