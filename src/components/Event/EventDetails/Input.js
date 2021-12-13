import { Controller } from "react-hook-form";
import { IconButton, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export const Input = ({ name, handlePhotoChange, required, value, pattern, ...props }) => (
  <Controller
    name={name}
    rules={{
      required: {value: !!required, message: 'this is required'},
      pattern
    }}
    defaultValue={value}
    render={({ field, fieldState }) => (
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
              hidden
              value={''} />
          </IconButton>
          :
          <TextField
            sx={{ margin: '.5em 0 .5em 0', whiteSpace: 'pre-wrap' }}
            {...field}
            {...props}
            autoFocus
            error={fieldState.error}
            helperText={fieldState.error?.message}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !props.multiline) {
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
