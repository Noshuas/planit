import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import {
  Button,
  Card,
  Grid,
  TextField,
} from '@mui/material';

export var EventInfo = function ({ parentState, setParentState, handleChange }) {
  const { form, windowStart, windowEnd } = parentState;
  const { setWindowStart, setWindowEnd } = setParentState;

  const defaults = {
    inputProps: { 'aria-label': 'naked' },
    required: true,
    fullWidth: true,
    onChange: handleChange,
  };

  return (
    <Grid item xs={4}>
      <Card>
        <TextField
          name="name"
          label="Event Name"
          value={form.name}
          {...defaults}
        />

        <TextField
          name="duration"
          label="Event Duration (hrs)"
          value={form.duration}
          type="number"
          {...defaults}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start"
            value={windowStart}
            onChange={setWindowStart}
            animateYearScrolling
            renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="End"
            value={windowEnd}
            onChange={setWindowEnd}
            animateYearScrolling
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          name="location"
          label="Event Location"
          value={form.location}
          {...defaults}
        />

      </Card>

      <Button type="submit" variant="contained" color="primary">
        Create Event
      </Button>
    </Grid>
  );
};
