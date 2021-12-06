/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';

import {
  PhotoBanner,
  EventInfo,
  EventDescription,
  EventCreatedModal,
  upgradeHook
} from '../components/create-event/';


export default function CreateEvent() {
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';

  const [windowStart, setWindowStart] = useState(new Date());
  const [windowEnd, setWindowEnd] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);

  const [form, setForm] = upgradeHook(useState({
    name: '',
    duration: '',
    location: '',
    description: '',
  }));
  const handleChange = ({ target }) => {
    let { name, value } = target;
    setForm({ [name]: value });
  };

  const createNewEvent = async (e) => {
    e.preventDefault();
    const { name, email } = session.user
    windowStart.setHours(0, 0, 0, 0);
    windowEnd.setHours(0, 0, 0, 0);
    form.duration *= 3600;
    form.window = {
      start: windowStart,
      end: windowEnd,
    };
    form.owner = { name, email }
    form.status = 'pending';
    form.time = null;
    axios.post(`/api/events/${email}`, form)
      .then(res => {
        console.log('response:', res)
        setConfirmed(true);
      })
      .catch(console.log);
  };

  if (!authenticated)
     return <h1>Loading...</h1>

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
