import { Backdrop } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./splashscreen.scss";
import { styled } from "@mui/material/styles";

const BackdropStyled = styled(Backdrop)({
  backgroundColor: "rgb(80 80 80 / 50%)",
});

function SplashScreen() {
  return (
    <BackdropStyled open={true}>
      <CircularProgress/>
    </BackdropStyled>
  );
}

export default SplashScreen;
