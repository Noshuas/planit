import Today from '@mui/icons-material/Today';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import IconButton from '@mui/material/IconButton';
import { forwardRef, useCallback, useState } from 'react';
import { useController } from 'react-hook-form';

export const DateRangePicker = forwardRef(function DateRangePicker({ style }, ref) {
  const { field: { onChange, value } } = useController({
    name: 'time.timeFrame',
    defaultValue: [Date.now(), Date.now()],
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = useCallback(() => { setOpen(true); },[]);
  const handelClose = useCallback(() => { setOpen(false); },[]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateRangePicker
        minDate={Date.now()}
        onClose={handelClose}
        open={open}
        clearable
        format="############"
        startText="Event Window Start"
        endText="Event Window End"
        value={value}
        onChange={onChange}
        renderInput={() => (
          <IconButton
            color="primary"
            onClick={handleClickOpen}
            ref={ref}
            {...{ style }}
          >
            <Today />
          </IconButton>
        )}
      />
      {/* </Box> */}
    </LocalizationProvider>
  );
});

export default DateRangePicker;
