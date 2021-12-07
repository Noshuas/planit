/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { getServerSideProps } from './home';
import {
  PhotoBanner,
  EventInfo,
  EventDescription,
  EventCreatedModal,
  upgradeHook,
  getPhotoURL,
  postEvent
} from '../components/create-event/';


export default function CreateEvent() {
  const { data: session, status } = useSession();
  const [windowStart, setWindowStart] = useState(new Date());
  const [windowEnd, setWindowEnd] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = upgradeHook(useState({
    owner: session.user,
    name: '',
    duration: '',
    location: '',
    description: '',
    status: 'pending',
    time: null,
  }));

  const handleChange = ({ target }) => {
    let { name, value } = target;
    setForm({ [name]: value });
  };

  const createNewEvent = async (e) => {
    e.preventDefault();
    windowStart.setHours(0, 0, 0, 0);
    windowEnd.setHours(0, 0, 0, 0);
    form.duration *= 60 * 60;
    form.window = {
      start: windowStart,
      end: windowEnd,
    };
    getPhotoURL(form.photo_url, (photoUrl)=>{
      form.photo_url = photoUrl;
      postEvent(session.user.email, form, setConfirmed);
    });
  };

  return (
    <div>
      <form onSubmit={createNewEvent}>
        <Grid container spacing={3}>
          <PhotoBanner
            form={form}
            setForm={setForm}
          />
          <EventInfo
            parentState={{ form, windowStart, windowEnd }}
            setParentState={{ setWindowStart, setWindowEnd }}
            handleChange={handleChange}
          />
          <EventDescription
            value={form.description}
            handleChange={handleChange}
          />
        </Grid >
      </form>
      <EventCreatedModal
        form={form}
        confirmed={confirmed}
        setConfirmed={setConfirmed}
      />
    </div>
  );
}

export { getServerSideProps }

