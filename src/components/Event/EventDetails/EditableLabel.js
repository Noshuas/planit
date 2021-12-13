import { Edit } from "@mui/icons-material";
import { Fade, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useCallback, useRef, useState } from "react";


export const EditableLabel = ({ label, handleClick, disabled, variant = 'h6', i, b, children, style }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));
  return (
    <Box
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography sx={{whiteSpace: 'pre-wrap'}} variant={variant} >
        {label}
        {!disabled &&
          <Fade timeout={300} in={hovered} >
            <IconButton> <Edit fontSize='small' /> </IconButton>
          </Fade>
        }
      </Typography >
      <Typography variant='subtitle2'>{children}</Typography>
    </Box>
  )
};

export default EditableLabel;
