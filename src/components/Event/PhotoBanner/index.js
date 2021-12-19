import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { PhotoUploadCard } from './PhotoUploadCard';

export const PhotoBanner = function ({ url }) {
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
    <Grid item xs={12} >
      <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ overflow: 'hidden', position: 'relative', minHeight: 144, width: '100%' }}>

        <Fade in={hovered} timeout={450}>
          <PhotoUploadCard handlePhotoChange={handlePhotoChange} />
        </Fade>
        <Image
          priority
          src={newUrl}
          layout="fill"
          alt="event-image"
          objectFit="cover"
        />
      </Card>
    </Grid>
  );
};
