import { Input } from 'components/Event/EventDetails/Input';
import Card from '@mui/material/Card';
import { forwardRef } from 'react';

export const PhotoUploadCard = forwardRef(function PhotoUploadCard({ handlePhotoChange, style }, ref) {
  return (
    <Card
      style={style}
      ref={ref}
      sx={{
        position: 'absolute',
        'z-index': 1,
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(255,255,255,.70)',
      }}
    >
      <Input name="imageUrl" type="file" handlePhotoChange={handlePhotoChange} />
      Upload Image
    </Card>
  )
})

export default PhotoUploadCard;
