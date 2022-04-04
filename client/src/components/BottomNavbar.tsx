import * as React from "react";
import {
  Box,
  Stack,
  BottomNavigation,
  BottomNavigationAction,
  SvgIcon,
} from "@mui/material";
import { ReactComponent as Home } from "../assets/icon/home.svg";
import { ReactComponent as StoryTalkList } from "../assets/icon/story-talk-list.svg";
import { ReactComponent as Send } from "../assets/icon/add-square.svg";
import { ReactComponent as StoryList } from "../assets/icon/story-list.svg";
import { ReactComponent as User } from "../assets/icon/user-square.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();

  return (
    // <Stack
    //   justifyContent="center"
    //   sx={{
    //     position: "sticky",
    //     bottom: 0,
    //     height: "70px",
    //     backgroundColor: "white",
    //   }}
    // >
    <BottomNavigation
      showLabels
      value={location.pathname}
      sx={{
        "& .MuiBottomNavigationAction-root": {
          minWidth: "",
        },
        "& .MuiSvgIcon-root": {
          // width: "30px",
          // height: "30px",
        },
        position: "sticky",
        bottom: 0,
        height: "70px",
        backgroundColor: "white",
      }}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        value="/"
        sx={{ color: "#D1CFCF" }}
        icon={<SvgIcon component={Home} inheritViewBox />}
      />
      <BottomNavigationAction
        component={Link}
        to="/story-talk/list"
        value="/story-talk/list"
        sx={{ color: "#D1CFCF" }}
        icon={<SvgIcon component={StoryTalkList} inheritViewBox />}
      />
      <BottomNavigationAction
        component={Link}
        to="/send"
        value="/send"
        sx={{ color: "#D1CFCF" }}
        icon={
          <SvgIcon
            sx={{ width: "35px", height: "35px" }}
            component={Send}
            inheritViewBox
          />
        }
      />
      <BottomNavigationAction
        component={Link}
        to="/story-list"
        value="/story-list"
        sx={{ color: "#D1CFCF" }}
        icon={<SvgIcon component={StoryList} inheritViewBox />}
      />
      <BottomNavigationAction
        component={Link}
        to="/profile"
        value="/profile"
        sx={{ color: "#D1CFCF" }}
        icon={<SvgIcon component={User} inheritViewBox />}
      />
    </BottomNavigation>
    // </Stack>
  );
}
