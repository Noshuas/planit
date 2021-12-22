import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export const LoadingSkeleton = ({ Props }) => (
  <Stack alignItems={'center'}>
    <Typography variant='h2'>Planit</Typography>
    <br />
    <Typography variant='h6'>
      Vercel recently reduced the time alotted to serverless functions to return a response, which in tandem with
      long cold start times may return a 504 error. Please refresh the page if this happens.
      </Typography>
    <Skeleton variant='circular' animation='wave' width={600} height={600} />
  </Stack>
)

export default LoadingSkeleton;