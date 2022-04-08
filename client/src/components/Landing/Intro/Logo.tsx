import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import PolaroidLogo from "assets/logo/PolaroidLogo.svg";

const Logo: React.FC = () => {
  const refSaContainer = useRef<null | HTMLDivElement>(null);
  const refYeonContainer = useRef<null | HTMLDivElement>(null);
  const refSaOtherContainer = useRef<null | HTMLDivElement>(null);
  const refYeonOtherContainer = useRef<null | HTMLDivElement>(null);
  const container = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (
        refSaContainer.current &&
        refYeonContainer.current &&
        refSaOtherContainer.current &&
        refYeonOtherContainer.current &&
        container.current
      ) {
        refSaContainer.current.style.transition = "2s";
        refSaContainer.current.style.fontSize = "60px";
        refSaContainer.current.style.transform = "translateY(50%)";
        refYeonContainer.current.style.transition = "2s";
        refYeonContainer.current.style.fontSize = "60px";
        refYeonContainer.current.style.transform = "translate(100%, -50%)";
        refSaOtherContainer.current.style.transition = "opacity 2s";
        refSaOtherContainer.current.style.opacity = "0";
        refYeonOtherContainer.current.style.transition = "opacity 2s";
        refYeonOtherContainer.current.style.opacity = "0";
        container.current.style.transform = "translateX(5%)";
        container.current.style.transition = "2s";
      }
    }, 3000);
  }, []);

  return (
    <Box
      ref={container}
      sx={{
        width: "100%",
        height: "150px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "#A4CCF3",
      }}
    >
      <img
        src={PolaroidLogo}
        alt="logo"
        style={{
          height: 120,
          display: "inline",
          padding: "5px",
        }}
      />

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "48px",
          }}
        >
          <div style={{ fontFamily: "YUniverse-B" }} ref={refSaContainer}>
            사
          </div>
          <span style={{ fontFamily: "YUniverse-B" }} ref={refSaOtherContainer}>
            진으로
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "48px",
          }}
        >
          <div style={{ fontFamily: "YUniverse-B" }} ref={refYeonContainer}>
            연
          </div>
          <span
            style={{ fontFamily: "YUniverse-B" }}
            ref={refYeonOtherContainer}
          >
            결하다
          </span>
        </div>
      </div>
    </Box>
  );
};

export default Logo;
