
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import EditableLabel from "../EventDetails/EditableLabel";
import { Input } from '../EventDetails/Input';

export const EventTitle = ({ title }) => {
  const [editMode, setEditMode] = useState(!title);
  const handleClick = useCallback(() => setEditMode(true));
  const handleBlur = useCallback(() => setEditMode(false));
  const newTitle = useWatch({ name: 'title', defaultValue: title })

  return (
    <>
      {editMode
        ?
        <Input
          onBlur={handleBlur}
          name="title"
          label="New Event Title"
          value={newTitle}
          rows={1}
          fullWidth
        />
        :
        <EditableLabel
          variant='h4'
          i b
          label={`${newTitle || 'Add Event Title'}`}
          handleClick={handleClick}
        />}
    </>
  )
};

export default EventTitle;
