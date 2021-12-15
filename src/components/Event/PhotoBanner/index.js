import { Card, Fade, Grid } from '@mui/material';
import { Box, minHeight } from '@mui/system';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { PhotoUploadCard } from './PhotoUploadCard';

export var PhotoBanner = function ({ url }) {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true) ,[]);
  const handleMouseLeave = useCallback(() => setHovered(false),[]);
  const newUrl = useWatch({
    name: 'imageUrl',
    defaultValue: url,
  });

  const handlePhotoChange = (event, cb) => {
    const [file] = event.target.files;
    const reader = new FileReader();
    reader.onload = ({ target }) => cb(target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Grid item xs={12}>
      <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ overflow: 'hidden', position: 'relative' }}>

        <Fade in={hovered} timeout={450}>
          <PhotoUploadCard handlePhotoChange={handlePhotoChange} />
        </Fade>
        <Image
          priority
          src={newUrl}
          layout="responsive"
          height={144}
          width={1050}
          alt="event-image"
          objectFit="cover"
        />
      </Card>
    </Grid>
  );
};
