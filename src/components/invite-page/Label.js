import { Typography } from "@mui/material";
import { Box } from "@mui/system";


export const Label = ({label, children}) => {

  return (
    <Box sx={{display: 'inline-block', margin: '0 1em'}}>
      <Typography variant='subtitle1'>{label}:</Typography>
      <Typography variant='caption'>{children}</Typography>
    </Box>
  )
}

export default Label;
