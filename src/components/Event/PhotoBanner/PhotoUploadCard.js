import { Input } from 'components/Event/EventDetails/Input'
import { Card } from '@mui/material';
import { forwardRef } from 'react';

export const PhotoUploadCard = forwardRef(({ handlePhotoChange, style }, ref) => (
  <Card style={style} ref={ref}
    sx={{
      position: 'absolute', 'z-index': 1,
      width: 1, height: 1,
      display: 'flex', 'flexDirection': 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgb(255,255,255,.70)',
    }}
  >
    <Input name='url' type='file' handlePhotoChange={handlePhotoChange} value=""/>
    Upload Image
  </Card>
));

export default PhotoUploadCard;
