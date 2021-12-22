import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export const LoadingSkeleton = ({ Props }) => (
  <Stack alignItems={'center'}>
    <Typography variant='h2'>Planit</Typography>
    <br />
    <Typography variant='h6'>
      Vercel has tightened restrictions on serverless function response times for free accounts which in tandem with
      long cold start times may result in a 504 error.
    </Typography>
    <Typography>
      Please refresh if this happens.
    </Typography>
    <Skeleton variant='circular' animation='wave' width={600} height={600} />
  </Stack>
)

export default LoadingSkeleton;