import {
  Card,
  Grid,
  TextField
} from '@mui/material';



export const EventDescription = ({ value, handleChange }) => {

  return (
    <Grid item xs={8}>
      <Card>
          <TextField
            name="description"
            placeholder="Event Description *"
            multiline
            rows={10}
            fullWidth
            inputProps={{ 'aria-label': 'naked' }}
            required
            value={value}
            onChange={handleChange}
          />
      </Card>
    </Grid>
  )
}