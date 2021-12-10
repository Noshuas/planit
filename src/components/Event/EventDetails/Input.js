import { Controller } from "react-hook-form";
import { IconButton, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export const Input = ({ name, handlePhotoChange, required, value, ...props, }) => (
  <Controller
    name={name}
    rules={{ required: !!required }}
    defaultValue={value}
    render={({ field }) => (
      <>
        {props.type === 'file'
          ?
          <IconButton variant="underlined" component="label">
            <ImageIcon />
            <input
              {...field}
              {...props}
              onChange={(e) => handlePhotoChange(e, field.onChange)}
              accept=".jpg, .jpeg, .png, .svg"
              value={null}
              hidden />
          </IconButton>
          :
          <TextField
            {...field}
            {...props}
            autoFocus
            onFocus={(e)=>e.target.select()}
            multiline
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                e.target.blur()
              }
            }}
          />
        }
      </>
    )}
  />
);

export default Input;
