import React, { useState, useEffect, useRef } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

/**
 * Custom image display
 * @param {src} props image source
 * @param {w} props image width
 * @param {h} props image height
 * @param {className} props image className
 * @returns {React.ReactElement}
 */
const CIMG = (props) => {
  const { src, alt, className, w, h, v, sw, sh, ...rest } = props;

  const [loading, setLoading] = useState(true);

  const imgRef = useRef(true);

  useEffect(() => {
    return () => {
      imgRef.current = false;
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (imgRef.current) {
        setLoading(false);
      }
    };
  }, [src]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: sw || '100%',
            height: sh || '100%',
          }}
        >
          <Skeleton
            variant={v || 'rectangular'}
            animation="wave"
            width={sw || '100%'}
            height={sh || '100%'}
          />
        </Box>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={className}
          style={{
            width: w || '100%',
            height: h || '100%',
          }}
        />
      )}
    </>
  );
};

export default React.memo(CIMG);
