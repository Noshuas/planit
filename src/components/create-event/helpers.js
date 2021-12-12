import axios from 'axios';

export const getPhotoURL = async (url, cb) => {
  const defaultUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Mars_Wikivoyage_banner.jpg'
  if (url === defaultUrl) {
      return { data: defaultUrl }
  };
  console.log('here is our url:', url);
  return axios.post(`/api/events/photos/dataUrl`, { url })
}

// makes useState()[1] calls more like component.setState();
export const upgradeHook = ([name, setState]) => [name, (val) => {
  if ((typeof val === 'object' && !Array.isArray(val))) {
    setState(prev => ({ ...prev, ...val }));
    return;
  }
  setState(val)
}];

export const postEvent = async (email, form, cb) => {
  return new Promise((resolve, reject) => {
    axios.post(`/api/events/${email}`, form)
      .then(resolve)
      .catch(reject)
  })
}