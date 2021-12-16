import axios from 'axios';


export const getPhotoURL = async (url, setValue) => {
  const defaultUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg';
  if (url === defaultUrl) {
    return { data: defaultUrl };
  }
  return axios.post('/api/events/photos/dataUrl', { url })
    .catch(err => {
      if (err.response.status === 413) {
        alert('Plase uplaod a photo less than 4 mb in sise');
        setValue('imageUrl', defaultUrl);
      }
      return err;
    });
};
