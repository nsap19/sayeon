import * as React from "react";
import Box from "@mui/material/Box";
import {
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

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: "sticky", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          "& .MuiBottomNavigationAction-root": {
            minWidth: "",
          },
          // position: "fixed",
          // bottom: 0,
          // left: 0,
          // right: 0,
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          icon={<SvgIcon component={Home} inheritViewBox />}
        />
        <BottomNavigationAction
          component={Link}
          to="/"
          icon={<SvgIcon component={StoryTalkList} inheritViewBox />}
        />
        <BottomNavigationAction
          component={Link}
          to="/"
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
          to="/"
          icon={<SvgIcon component={StoryList} inheritViewBox />}
        />
        <BottomNavigationAction
          component={Link}
          to="/register"
          icon={<SvgIcon component={User} inheritViewBox />}
        />
      </BottomNavigation>
    </Box>
  );
}
