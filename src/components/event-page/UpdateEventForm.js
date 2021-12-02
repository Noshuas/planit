/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/Event.module.css';

const UpdateEventForm = ({ data, refeshData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: data.description,
      location: data.location,
      duration: data.duration / 3600,
    },
  });
  const onSubmit = (d) => {
    const updates = [];
    d.duration *= 3600;
    for (const k in d) {
      // console.log(data[k])
      if (d[k] !== data[k]) {
        updates.push(
          {
            where: {
              property: '_id',
              value: data._id,
            },
            what: {
              method: '$set',
              field: k,
              value: d[k],
            },
          },
        );
      }
    }
    console.log(updates);
    const config = {
      method: 'put',
      url: 'http://localhost:3000/api/events',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { updates },
    };
    axios(config).then(() => {
      setOpen(false);
      refeshData();
    }).catch((err) => {
      console.log(err);
    });
    // setOpen(false)
  };
  if (open) {
    return (
      <div className={styles.info}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h3>
              Location:
            </h3>
            <textarea className={styles.descriptionText} rows="1" {...register('location')} />
          </label>
          <label className={styles.descriptionText}>
            <h3>
              Duration:
            </h3>
            <div className={styles.flex}>
              <input className={styles.info} step="0.5" type="number" {...register('duration')} />
              {' '}
              hours
            </div>
          </label>
          <label>
            <h3>Description:</h3>
            <textarea className={styles.descriptionText} rows="5" {...register('description')} />
          </label>
          <div>
            <Button type="submit">
              Save
            </Button>
            <Button onClick={() => { setOpen(false); }}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className={styles.info}>
      <div>
        <h3>Location:</h3>
        <p>{data.location}</p>
      </div>
      <div>
        <h3>Duration:</h3>
        <p>
          {data.duration / 3600}
          {' '}
          hours
        </p>
      </div>
      <h3>Description:</h3>
      <p>{data.description}</p>
      <div>

        <Button onClick={() => { setOpen(true); }}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default UpdateEventForm;
