import React from "react";
import { Stack, Box } from "@mui/material";
import { Fade, Slide } from "react-awesome-reveal";
import PolaroidLogo from "assets/logo/PolaroidLogo.svg";

const Content: React.FC<{
  smallTitle: string;
  title: string;
  content: string;
  imageUrl: string;
}> = ({ smallTitle, title, content, imageUrl }) => {
  return (
    <Stack
      direction="column"
      alignItems="start"
      justifyContent="center"
      sx={{ height: "100vh", padding: "20px" }}
    >
      <Slide direction="up">
        <p
          style={{
            fontSize: "16px",
            padding: "5px 5px 5px 0",
            color: "#8c8888",
          }}
        >
          {smallTitle}
        </p>
      </Slide>

      <Slide direction="up">
        <p
          style={{
            fontSize: "36px",
            padding: "0 5px 10px 0",
            color: "#A4CCF3",
            // fontFamily: "S-CoreDream-6Bold",
          }}
        >
          {title}
        </p>
      </Slide>

      <Slide direction="up">
        <p
          style={{
            fontSize: "16px",
            whiteSpace: "pre-wrap",
            color: "#8c8888",
            fontFamily: "S-CoreDream-3Light",
            padding: "0 0px 50px",
          }}
        >
          {content}
        </p>
      </Slide>

      <Slide
        // duration={500}
        direction="up"
        style={{ width: "100%", textAlign: "center" }}
      >
        <img
          src={require(`../../assets/images/landing/Landing_image_${imageUrl}.png`)}
          alt="logo"
          style={{
            height: 350,
            display: "inline",
            padding: "5px",
          }}
        />
      </Slide>
    </Stack>
  );
};

export default Content;
