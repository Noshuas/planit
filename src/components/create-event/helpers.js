import axios from 'axios';

export const getPhotoURL = async (url, cb) => {
  const defaultUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg'
  if (url === defaultUrl) {
      return { data: defaultUrl }
  };
  console.log('here is our url:', url);
  return axios.post(`/api/events/photos/dataUrl`, { url })
}

export const postEvent = async (form) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/events`, form)
      .then(resolve)
      .catch(reject)
  })
}