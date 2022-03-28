import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    overflow: "hidden",
    border: "none",
    borderRadius: 31.5,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
    fontFamily: "S-CoreDream-4Regular",
    width: "300px",
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#2b2b2b",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "transparent",
    },
  },
  "& label.Mui-focused": {
    color: "#241C1C",
  },
  "& .MuiInputLabel-root": { fontFamily: "S-CoreDream-4Regular" },
  "& .MuiFormHelperText-root": {
    fontFamily: "S-CoreDream-4Regular",
    marginTop: 0,
  },
}));

export { StyledTextField };
