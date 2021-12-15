import { Card, CardContent, CardHeader } from '@mui/material';

export var EventDescription = function ({ description }) {
  return (
    <Card>
      <CardContent>
        {description}
      </CardContent>
    </Card>
  );
};

export default EventDescription;
