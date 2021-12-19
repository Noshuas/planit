import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

export const Label = function ({ label, children }) {
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
