import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import { LocalizationProvider, MobileDateRangePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useController } from "react-hook-form";


export const DateRangePicker = () => {
  const { field: { onChange, onBlur, value }} = useController({
    name: 'timeFrame',
    defaultValue: [Date.now(), Date.now()]
  })

  const [open, setOpen] = useState(false);
  const handleClickOpen = useCallback(() => {setOpen(true)});
  const handelClose = useCallback(() => {setOpen(false)});

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateRangePicker
          minDate={Date.now()}
          onClose={handelClose}
          open={open}
          clearable
          format={'############'}
          startText="Event Window Start"
          endText="Event Window End"
          value={value}
          onChange={onChange}
          renderInput={(startProps, endProps) => {
            return (
              <>
                <TextField sx={{ display: 'none' }}{...startProps}{...{ onBlur }} />
                <TextField sx={{ display: 'none' }}{...endProps} {...{ onBlur }} />
                <Button variant='contained' endIcon={<CalendarIcon />} onClick={handleClickOpen} >
                  Select Time Range:
                </Button>
              </>
            );
          }}
        />
      </LocalizationProvider>
  )
}

export default DateRangePicker;
