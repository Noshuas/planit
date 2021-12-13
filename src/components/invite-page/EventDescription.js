import { Card, CardContent, CardHeader } from "@mui/material";


export const EventDescription = ({description}) => {

  return (
    <Card>
      <CardContent>
        {description}
      </CardContent>
    </Card>
  )
}

export default EventDescription;
