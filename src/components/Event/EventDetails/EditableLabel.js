import { Edit } from "@mui/icons-material";
import { Fade, IconButton, Typography } from "@mui/material";
import { forwardRef, useCallback, useRef, useState } from "react";


export const EditableLabel = ({ label, handleClick, disabled, variant = 'subtitle1', i, b }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));

  return (
    <Typography variant={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      sx={{ fontStyle: i ? 'italic' : 'normal', fontWeight: b ? 'bold' : 'normal', whiteSpace: 'pre-wrap'}}
    >
      {label}
      {!disabled &&
        < Fade
          timeout={300}
          // direction='left'
          in={hovered}
        >
          <IconButton>
            <Edit fontSize='small' />
          </IconButton>
        </Fade>}
    </Typography >

  )
};

export default EditableLabel;
