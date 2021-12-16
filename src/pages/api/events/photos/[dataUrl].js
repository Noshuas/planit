import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

const formatURL = ({ secure_url }) => {
  const middle = '/c_fill,g_auto,h_150,w_1050/';
  const insertInd = secure_url.indexOf('upload/') + 7;
  const start = secure_url.slice(0, insertInd);
  const end = secure_url.slice(insertInd);
  return start + middle + end;
};

export default async function handler({ body }, res) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(body.url, (err, result) => {
      if (err) res.status(400).send(err);
      res.status(200).send(formatURL(result));
      resolve();
    });
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}