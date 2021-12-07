import Image from 'next/image';
import { Card, Grid } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const PhotoUploadCard = ({ onUpload }) => (
  <label htmlFor="contained-button-file">
    <Card>
      <ImageIcon />
      <input
        id="contained-button-file"
        type="file"
        onChange={onUpload}
        accept=".jpg, .jpeg, .png, .svg"
      />
      Click to upload file
    </Card>
  </label>
);

const PhotoCard = ({ form }) => (
  <Image
    src={form.photo_url || ''}
    layout="responsive"
    height={144}
    width={1050}
    alt="event-image"
  />
);


export const PhotoBanner = (props) => {

  const renderUpload = ({ target }) => {
    const [file] = target.files
    const reader = new FileReader();

    reader.onload = ({target}) => {
      props.setForm({photo_url: target.result})
    }

    reader.readAsDataURL(file);
  }

  return (
    <Grid item xs={12}>
      {(!props.form.photo_url)
        ? <PhotoUploadCard {...props} onUpload={renderUpload} />
        : <PhotoCard {...props} />}
    </Grid>
  )
}
