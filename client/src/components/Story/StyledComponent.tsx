import { Button, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  color: "white",
  fontFamily: "S-CoreDream-4Regular",
  margin: "5px 0 5px",
  width: "300px",
  height: "50px",
  borderRadius: "15px",
});

const StyledP = styled("p")({
  color: "#8C8888",
  margin: "10px 0 0 20px",
  fontFamily: "S-CoreDream-6Bold",
  alignSelf: "start",
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
  "& .MuiToggleButtonGroup-grouped": {
    fontFamily: "S-CoreDream-4Regular",
    border: 0,
    "&:not(:first-of-type)": {
      borderRadius: "30px",
    },
    "&:first-of-type": {
      borderRadius: "30px",
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: "white",
  padding: "7px 15px",
  width: "90px",
  height: "30px",
  maring: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#A4CCF3",
    color: "white",
    borderTop: "",
  },
}));

const StyledStack = styled(Stack)({
  margin: "20px 10px 10px",
  overflowY: "auto",
  overflowX: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

export {
  StyledButton,
  StyledP,
  StyledToggleButtonGroup,
  StyledToggleButton,
  StyledStack,
};
