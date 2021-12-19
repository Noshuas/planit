import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import EditableLabel from '../EventDetails/EditableLabel';
import { Input } from '../EventDetails/Input';

export var EventDescription = function ({ description }) {
  const [editMode, setEditMode] = useState(false);
  const handleClick = useCallback(() => setEditMode(true), []);
  const handleBlur = useCallback(() => setEditMode(false), []);
  const newDescription = useWatch({ name: 'description', defaultValue: description });

  return (
    <>
      {editMode
        ? (
          <Input
            onBlur={handleBlur}
            name="description"
            label="New Event Description"
            value={newDescription || ''}
            multiline
            rows="8"
            fullWidth
          />
        )
        : (
          <EditableLabel
            variant="body1"
            label={`${newDescription || 'Enter a description'}`}
            handleClick={handleClick}
          />
        )}
    </>
  );
};

export default EventDescription;
