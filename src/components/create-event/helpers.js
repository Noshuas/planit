import axios from 'axios';

export const getPhotoURL = ({ target }, cb) => {
  const [image] = target.files;
  const formData = new FormData;
  formData.append("image", image);

  axios.post('/api/events/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(cb).catch(console.log)
}

// makes useState()[1] calls more like component.setState();
export const upgradeHook = ([name, setState]) => [name, (val) => {
  if ((typeof val === 'object' && !Array.isArray(val))) {
    setState(prev => ({...prev, ...val}));
    return;
  }
  setState(val)
}];
