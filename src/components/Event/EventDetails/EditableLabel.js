import { Edit } from "@mui/icons-material";
import { Fade, IconButton, Typography } from "@mui/material";
import { forwardRef, useCallback, useRef, useState } from "react";


export const EditableLabel = ({ label, handleClick, disabled, variant = 'subtitle1', i, b }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setHovered(true));
  const handleMouseLeave = useCallback(() => setHovered(false));
  const containerRef = useRef(null);

  const EditIcon = forwardRef((props, ref) => (
    <IconButton {...props} ref={ref}>
      <Edit fontSize='small' />
    </IconButton>
  ))

  return (
    <Typography variant={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      sx={{fontStyle: i ? 'italic' : 'normal', fontWeight: b ? 'bold' : 'normal'}}
    >
      {label}
      {!disabled &&
        < Fade
          timeout={300}
          // direction='left'
          in={hovered}
          container={containerRef.current}
        >
          <EditIcon onClick={handleClick} />
        </Fade>}
    </Typography >

  )
};

export default EditableLabel;
