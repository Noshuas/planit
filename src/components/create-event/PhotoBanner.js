import Image from 'next/image';
import { Card, Grid } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const PhotoUploadCard = function ({ onUpload }) {
  return (
    <label htmlFor="contained-button-file">
      <Card>
        <ImageIcon />
        <input
          id="contained-button-file"
          type="file"
          onChange={onUpload}
          accept=".jpg, .jpeg, .png, .svg"
        />
        Click to upload photo (limit: 4mb)
      </Card>
    </label>
  );
};

const PhotoCard = function ({ form }) {
  return (
    <Image
      src={form.photo_url || ''}
      layout="responsive"
      height={144}
      width={1050}
      alt="event-image"
    />
  );
};

export var PhotoBanner = function (props) {
  const renderUpload = ({ target }) => {
    const [file] = target.files;
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      props.setForm({ photo_url: target.result });
    };

    reader.readAsDataURL(file);
  };

  return (
    <Grid item xs={12}>
      {(!props.form.photo_url)
        ? <PhotoUploadCard {...props} onUpload={renderUpload} />
        : <PhotoCard {...props} />}
    </Grid>
  );
};
