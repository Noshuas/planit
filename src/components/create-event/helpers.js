import axios from 'axios';

export const getPhotoURL = async (url) => {
  const defaultUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg';
  if (url === defaultUrl) {
    return { data: defaultUrl };
  }
  return axios.post('/api/events/photos/dataUrl', { url });
};
