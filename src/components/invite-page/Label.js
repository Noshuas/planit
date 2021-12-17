import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

export var Label = function ({ label, children }) {
  return (
    <Grid item>
      <Typography variant="body1">
        {label}
        :
      </Typography>
      <Typography variant="body2">{children}</Typography>
    </Grid>
  );
};

export default Label;
