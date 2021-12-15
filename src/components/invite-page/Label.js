import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export var Label = function ({ label, children }) {
  return (
    <Box sx={{ display: 'inline-block', margin: '0 1em' }}>
      <Typography variant="body1">
        {label}
        :
      </Typography>
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
};

export default Label;
