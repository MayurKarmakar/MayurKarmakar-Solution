import { Box, Fade } from "@mui/material";
import React, { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
  fadeIn: boolean;
};

export const FormWrapperBox: React.FC<LayoutWrapperProps> = ({
  children,
  fadeIn,
}) => {
  return (
    <Fade in={fadeIn}>
      <Box
        sx={{
          display: { xs: "flex", sm: "grid" },
          flexDirection: { xs: "column" },
          height: "100%",
          width: "100%",
          gridTemplateRows: "1fr 1fr",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: { xs: "3px", sm: "5px", md: "5px", lg: "20px" },
        }}
      >
        {children}
      </Box>
    </Fade>
  );
};
