import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export const LoadingSkeleton = ({ Props }) => (
  <Stack alignItems={'center'}>
    <Skeleton variant='circular' animation='wave' width={900} height={900} />
  </Stack>
)

export default LoadingSkeleton;