import Image from 'next/image';
import { Card, Grid } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { getPhotoURL } from 'next/dist/shared/lib/utils';

const PhotoUploadCard = ({ handlePhotoChange }) => (
  <label htmlFor="contained-button-file">
    <Card>
      <ImageIcon />
      <input
        id="contained-button-file"
        type="file"
        onChange={handlePhotoChange}
        accept=".jpg, .jpeg, .png, .svg"
      />
      Click to upload file
    </Card>
  </label>
);

const PhotoCard = ({ form }) => (
  <Image
    src={form.photo_url}
    layout="responsive"
    height={144}
    width={1050}
    alt="event-image"
  />
);


export const PhotoBanner = (props) => {

  const onUpload = (e) => {
    getPhotoURL(e, (res) => {
      setForm({
        ...form,
        photo_url: res.text()
      })
    })
  }

  return (
    <Grid item xs={12}>
      {(!props.form.photo_url)
        ? <PhotoUploadCard {...props} onUpload={onUpload} />
        : <PhotoCard {...props} />}
    </Grid>
  )
}
