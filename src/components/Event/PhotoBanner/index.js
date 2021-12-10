import { Fade, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { PhotoUploadCard } from './PhotoUploadCard';

export const PhotoBanner = ({ url }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));

  const handlePhotoChange = useCallback((event , cb) => {
    const [ file ] = event.target.files
    const reader = new FileReader();
    reader.onload = ({ target }) => cb(target.result);
    reader.readAsDataURL(file);
  })

  return (
    <Grid item xs={8}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{borderRadius: '5px', overflow: 'hidden', position: 'relative'}}>
        <Fade in={!url || hovered} timeout={450} >
          <PhotoUploadCard handlePhotoChange={handlePhotoChange} />
        </Fade>
        {url &&
          <Image
            priority
            src={url}
            layout="responsive"
            height={144}
            width={1050}
            alt="event-image"
            objectFit="cover"
          />}
      </div>
    </Grid>
  )
}