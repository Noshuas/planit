import { Controller } from "react-hook-form";
import { IconButton, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export const Input = ({ name, handlePhotoChange, required, value, ...props }) => (
  <Controller
    name={name}
    rules={{ required: !!required }}
    defaultValue={value}
    render={({ field }) => {
      if (props.type === 'file') {
        delete field.value;
        props.accept = ".jpg, .jpeg, .png, .svg"
        props.onChange = (e) => handlePhotoChange(e, field.onChange)
        return (
          <>
            <IconButton variant="underlined" component="label">
              <ImageIcon />
              <input {...field} {...props} hidden />
            </IconButton>
          </>
        )
      }
      return (
        <TextField {...field} {...props} />
      )
    }}
  />
)


export default Input;
