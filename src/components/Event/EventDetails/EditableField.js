import { Edit } from "@mui/icons-material";
import { IconButton, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";


export const EditableLabel = ({ label, handleClick, disabled }) => {
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
    <Typography variant='h6'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {label}
      {!disabled &&
        < Slide
          timeout={350}
          direction='left'
          in={hovered}
          container={containerRef.current}
        >
          <EditIcon onClick={handleClick} />
        </Slide>}
    </Typography >

  )
};

export default EditableLabel;
