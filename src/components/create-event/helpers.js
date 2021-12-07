import axios from 'axios';

export const getPhotoURL = (url, cb) => {
  if (!url) {
    cb({ photo_url: '' })
    return;
  };
  console.log('sending to server:', {url});

  axios.post(`/api/events/photos/dataUrl`, { url })
    .then(({ data }) => {
      console.log('response from server:', data)
      cb(data)
    })
    .catch(console.log)
}

// makes useState()[1] calls more like component.setState();
export const upgradeHook = ([name, setState]) => [name, (val) => {
  if ((typeof val === 'object' && !Array.isArray(val))) {
    setState(prev => ({ ...prev, ...val }));
    return;
  }
  setState(val)
}];

export const postEvent = (email, form, cb) => {
  axios.post(`/api/events/${email}`, form)
    .then(res => cb(true))
    .catch(console.log);
}