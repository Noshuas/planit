import Edit from '@mui/icons-material/Edit';
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box';
import { useCallback, useState } from 'react';

export var EditableLabel = function ({
  label, handleClick, disabled, variant = 'h6', i, b, children, style,
}) {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true) ,[]);
  const handleMouseLeave = useCallback(() => setHovered(false),[]);
  return (
    <Box
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      minWidth={'11em'}
    >
      <Typography sx={{ whiteSpace: 'pre-wrap' }} variant={variant}>
        {label}
        {!disabled
          && (
          <Fade timeout={300} in={hovered}>
            <IconButton>
              {' '}
              <Edit fontSize="small" />
              {' '}
            </IconButton>
          </Fade>
          )}
      </Typography>
      <Typography variant="subtitle2">{children}</Typography>
    </Box>
  );
};

export default EditableLabel;
