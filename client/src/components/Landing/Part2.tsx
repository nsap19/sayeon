import React from "react";
import { Stack, Box } from "@mui/material";
import { Fade, Slide } from "react-awesome-reveal";
import PolaroidLogo from "assets/logo/PolaroidLogo.svg";

const Part2: React.FC = () => {
  return (
    <Stack
      direction="column"
      alignItems="start"
      justifyContent="center"
      sx={{ height: "100vh", padding: "20px" }}
    >
      <Slide direction="up">
        <p style={{ fontSize: "18px", padding: "5px 5px 5px 0" }}>대분류</p>
      </Slide>

      <Slide direction="up">
        <p
          style={{
            fontSize: "36px",
            padding: "5px 5px 10px 0",
            color: "#A4CCF3",
            fontFamily: "S-CoreDream-6Bold",
          }}
        >
          중간 타이틀
        </p>
      </Slide>

      <Slide direction="up">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem et
          natus, ullam repellat aspernatur itaque, suscipit autem temporibus nam
          quod rerum eveniet numquam voluptate dolorum accusantium dicta, modi
          aperiam totam.
        </p>
      </Slide>

      <Slide direction="up" style={{ width: "100%", textAlign: "center" }}>
        <img
          src={PolaroidLogo}
          alt="logo"
          style={{
            height: 200,
            display: "inline",
            padding: "5px",
          }}
        />
      </Slide>
    </Stack>
  );
};

export default Part2;
