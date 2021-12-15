import { Grid } from "@mui/material";
import { useWatch } from "react-hook-form";
import EditableLabel from "./EditableLabel";


export const ScheduledFor = ({scheduled}) => {
  const newScheduled = useWatch({ name: 'time.scheduled', defaultValue: scheduled });

  return (!newScheduled)
    ? ''
    : (
      <Grid item>
        <EditableLabel label='Event Time:' >
          {new Date(newScheduled).toLocaleString()}
        </EditableLabel>
      </Grid>
    )
}

export default ScheduledFor;
